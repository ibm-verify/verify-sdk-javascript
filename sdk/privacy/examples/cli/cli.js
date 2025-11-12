// Copyright contributors to the IBM Verify Privacy SDK
// for JavaScript project

/* eslint-disable max-len */
// Import the OAuth SDK
const OAuthContext = require('ibm-verify-sdk').OAuthContext;

// Import the Privacy SDK
const Privacy = require('@ibm-verify/privacy');

// Import readline for user input
const readline = require('readline');

// Load environment
require('dotenv').config(__dirname + '/../');

/**
 * Main function that performs assessment, gets metadata, asks for
 * consent and stores consent
 */
main = async () => {
  let input = process.env.CONSENT_ITEMS;
  if (!input || input == '') {
    input = await _getInput(
        '\nItems for assessment (space separated <purpose/EULA>/<attribute>:<access type>): ',
    );
  }

  // parse the items
  const items = await _parseItems(input);
  // get user token using ROPC
  const token = await _getToken();
  // initialize the Privacy object
  const privacy = new Privacy({
    tenantUrl: process.env.TENANT_URL,
  }, {
    accessToken: token,
  }, {});

  // Perform the assessment
  const decision = await privacy.assess(items);
  console.log(`ASSESSMENT:\n${JSON.stringify(decision, null, 2)}\n\n`);

  if (decision.status == 'consent') {
    // filter the list based on those that can be consented
    const items = [];
    for (const assess of decision.assessment) {
      for (const iaresult of assess.result) {
        const attrId = (assess.attributeId) ? assess.attributeId : iaresult.attributeId;
        const assessLog = `${assess.purposeId},${attrId},${assess.accessTypeId},${JSON.stringify(iaresult)}`;
        if (!iaresult.requiresConsent) {
          console.log(`DEBUG: Requires no consent: `, assessLog);
          continue;
        }

        console.log(`DEBUG: Requires consent: ${assessLog}`);
        items.push({
          purposeId: assess.purposeId,
          attributeId: attrId,
          accessTypeId: assess.accessTypeId,
        });
      }
    }

    // metadata used to render a user consent page
    const r = await privacy.getConsentMetadata(items);
    console.log(`METADATA:\n${JSON.stringify(r, null, 2)}\n\n`);

    // collect consents
    console.log('Review request for consent\n');
    console.log('---------------------------\n\n');

    const consents = [];
    for (const record of r.metadata.eula) {
      const consent = await _getConsent(record, _buildEULAConsentQ);
      if (consent == null) {
        continue;
      }

      consents.push(consent);
    }

    for (const record of r.metadata.default) {
      const consent = await _getConsent(record, _buildConsentQ);
      if (consent == null) {
        continue;
      }

      consents.push(consent);
    }

    // save consents
    console.log(`Your consents are about to be saved:\n${JSON.stringify(consents, null, 2)}\n`);
    const yn = await _getInput('Proceed? ');
    if (yn.toLowerCase().startsWith('y')) {
      const r = await privacy.storeConsents(consents);
      console.log(`Your consents have been saved:\n${JSON.stringify(r, null, 2)}`);
    }
  } else if (decision.status == 'approved') {
    console.log('No action needed. Everything is approved');
  } else if (decision.status == 'denied') {
    console.log('None of the requested items are permitted for use.');
  } else if (decision.status == 'error') {
    console.log(`Something catastrophic happened\nJSON.stringify(decision.error, null, 2)`);
  }

  return decision.status;
};

/**
 * Gets the OAuth token using ROPC
 */
_getToken = async () => {
  let username = process.env.USERNAME;
  if (!username || username == '') {
    username = await _getInput('Username: ');
  }

  let password = process.env.PASSWORD;
  if (!password || password == '') {
    password = await _getInput('Password: ', true);
  }

  const config = {
    tenantUrl: process.env.TENANT_URL,
    clientId: process.env.APP_CLIENT_ID,
    clientSecret: process.env.APP_CLIENT_SECRET,
    flowType: 'ropc',
    scope: 'openid',
  };

  const authClient = new OAuthContext(config);

  let accessToken = null;

  try {
    const r = await authClient.login(username, password);
    accessToken = r.access_token;
  } catch (err) {
    console.log(`ERR on getToken: ${JSON.stringify(err)}`);
  }

  return accessToken;
};

/**
 * Parses the items in the environment. The item serialization
 * is entirely optional. It is used here for simplicity of config
 * given this is a CLT.
 * @param {string} input
 */
_parseItems = async (input) => {
  const items = [];
  const serializedItems = input.split(' ');
  for (const serializedItem of serializedItems) {
    let tokens = serializedItem.split('/');
    const purposeId = tokens[0];
    let attributeId = null; let accessTypeId = null;
    if (tokens.length > 1) {
      if (tokens[1].startsWith(':')) {
        accessTypeId = tokens[1].substring(1);
      } else {
        tokens = tokens[1].split(':');
        attributeId = tokens[0];
        if (tokens.length > 1) {
          accessTypeId = tokens[1];
        }
      }
    }

    const item = {
      purposeId: purposeId,
      attributeId: attributeId,
      accessTypeId: accessTypeId,
    };

    // hack
    if (attributeId == null) {
      delete item.attributeId;
    }

    if (accessTypeId == null) {
      delete item.accessTypeId;
    }

    items.push(item);
  }

  return items;
};

/**
 * Metadata record returned by the SDK
 * @external MetadataRecord
 * @see {@link https://ibm-verify.github.io/javascript/privacy/docs/global.html#MetadataRecord}
 */

/**
 * Gets the consent record. This function asks the question
 * and based on the answer and some details in the record,
 * it builds the consent record.
 *
 * @param {MetadataRecord} record consent metadata record
 * @param {function} qbuilder Lambda to build the question
 */
_getConsent = async (record, qbuilder) => {
  if (record.consentType === Privacy.ConsentDisplayTypes.DO_NOT_SHOW) {
    return null;
  }

  const q = qbuilder(record);

  // Default it
  let consentType = null;
  if (record.assentUIDefault) {
    consentType = record.consentType == Privacy.ConsentDisplayTypes.OPTIN_OR_OUT ?
            Privacy.ConsentTypes.OPTIN : Privacy.ConsentTypes.ALLOW;
  } else {
    consentType = record.consentType == Privacy.ConsentDisplayTypes.OPTIN_OR_OUT ?
            Privacy.ConsentTypes.OPTOUT : Privacy.ConsentTypes.DENY;
  }

  // Set transparent
  if (record.consentType === Privacy.ConsentDisplayTypes.TRANSPARENT) {
    console.log(q + '\n');
    consentType = Privacy.ConsentTypes.TRANSPARENT;
  } else {
    let a = await _getInput(q);
    a = a.toLowerCase();
    if (a.startsWith('y')) {
      consentType = record.consentType == Privacy.ConsentDisplayTypes.OPTIN_OR_OUT ?
                Privacy.ConsentTypes.OPTIN : Privacy.ConsentTypes.ALLOW;
    } else if (a.startsWith('n')) {
      consentType = record.consentType == Privacy.ConsentDisplayTypes.OPTIN_OR_OUT ?
                Privacy.ConsentTypes.OPTOUT : Privacy.ConsentTypes.DENY;
    }
  }

  const consent = {
    purposeId: record.purposeId,
    attributeId: record.attributeId,
    accessTypeId: record.accessTypeId,
    state: consentType,
  };

  // hack
  if (consent.attributeId == null) {
    delete consent.attributeId;
  }

  if (consent.accessTypeId == null) {
    delete consent.accessTypeId;
  }

  return consent;
};

/**
 * Build the consent question for EULA
 * @param {MetadataRecord} record consent metadata record
 * @return {string}
 */
_buildEULAConsentQ = (record) => {
  let defaultValue = record.assentUIDefault ? 'Yes' : 'No';
  if (record.isTransparent) {
    defaultValue = 'OK';
  }

  const str = `I have read and agree to ${record.purposeName} at ${record.termsOfUseRef}` +
        ` (Default: ${defaultValue}): `;

  return str;
};

/**
 * Build the consent question for purpose-of-use and attributes
 * @param {MetadataRecord} record consent metadata record
 * @return {string}
 */
_buildConsentQ = (record) => {
  let defaultValue = record.assentUIDefault ? 'Yes' : 'No';
  if (record.isTransparent) {
    defaultValue = 'OK';
  }

  /*
Allow {{access-type}} access to my {{attribute}} for {{purpose}}
    */

  let str = 'Allow';
  if (record.accessTypeId != 'default') {
    str += ` ${record.accessType} access`;
  } else {
    str += ' access';
  }

  if (record.attributeId != null) {
    str += ` to my ${record.attributeName}`;
  }

  str += ` for ${record.purposeName}`;
  str += ` (Default: ${defaultValue}): `;

  return str;
};

// Function to get input from user
// Includes option to mute the echo for passwords
_getInput = (question, muted = false) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    if (muted) rl.stdoutMuted = true;

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (rl.stdoutMuted) {
        rl.output.write('\x1B[2K\x1B[200D' + rl.query);
      } else {
        rl.output.write(stringToWrite);
      }
    };
    rl.query = question;
    rl.question(rl.query, (text) => {
      rl.close();
      if (rl.stdoutMuted) {
        rl.output.write('\n');
      }
      resolve(text);
    });
  });
};

main().then((r) => {
  console.log(`== END ==`);
});
