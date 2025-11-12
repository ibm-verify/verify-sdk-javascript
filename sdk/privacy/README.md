# IBM Verify Privacy SDK for Javascript

Fast, opinionated, simple privacy SDK for [Node](https://nodejs.org)
that leverages the data privacy & consent engine on IBM Verify.

---

```js
const Privacy = require('@ibm-verify/privacy');

// tenant information and other global config
const config = { tenantUrl: "https://abc.verify.ibm.com" };
// access token generated using any OAuth client library
const auth = { accessToken: getToken() };
// optional context
const context = { "ipAddress": "1.2.3.4" };

const privacy = new Privacy(config, auth, context);

// determine items that need assessment
let items = [
    {
        "purposeId": "marketing",
        "attributeId": "mobile_number",
        "accessTypeId": "default"
    }
];

doAssess = async (req, res) => {
  // assess if the item can be used
  let decision = await privacy.assess(items);
  if (decision.status == "consent") {
    // metadata used to render a user consent page
    let r = await privacy.getConsentMetadata(items);
    res.render('consent', { metadata: r.metadata });
  }
  // handle other cases
}

storeConsents = async (req, res) => {
  // assuming the request.body is a JSON array of 
  // consent records that need to be stored
  let r = await privacy.storeConsents(req.body);
  if (r.status == "success") {
    // done. Respond accordingly
  } else if (r.status == "fail") {
    // something didn't save. For example - an attempt was made to store a consent
    // for an attribute that isn't linked to a purpose on Verify.
    // Render an appropriate error code to the user.
  }
}

```

## Prerequisites

* Sign up for your [IBM Verify Tenant](https://docs.verify.ibm.com/verify/docs/signing-up-for-a-free-trial).
* If you are not using an OAuth/OIDC application to get a user/delegated token, obtain a privileged access token by configuring an [API client](https://docs.verify.ibm.com/verify/docs/create-api-client) with the following entitlements.
  - Check for data usage approval _to assess the usage of requested data items_
  - Retrieve privacy purposes and associated user's consent _to present a complete user consent experience_
  - Create privacy consent records _to record consents_
  - Read privacy consents _to get the user's consents_
* Identify attributes you intend to use in your application that require assessment
* Identify purpose-of-use for those attributes

## Installation

Use [npm](https://github.com/npm/cli) to install the SDK:

```bash
$ npm install @ibm-verify/privacy
```

## Features

- Integrate with the Verify data privacy engine using APIs
- Insert privacy assessment and consent at any point in your application flow. Privacy & compliance regulations are configured centrally on the Verify tenant
- Build pleasing experiences for user consent and preferences using the simplified object returned by the `getConsentMetadata` function

## Documentation

* [Library documentation](https://ibm-verify.github.io/javascript/privacy/docs/index.html)
* [Usage examples](https://github.com/ibm-verify/verify-sdk-javascript/tree/main/sdk/privacy/examples)

## Tests

Before running the tests, the Verify tenant must be configured with the following:

* Purpose with ID `marketing`
* Purpose `marketing` must be configured with two attributes - `mobile_number` and `email`
* Purpose `marketing` must be configured with the `default` access type

The test environment must be setup as below:

1. In the directory where this Git repository is cloned, run:

  ```
  $ npm install
  ```

2. Copy `./test/dotenv` to `./test/.env`
3. Use any OIDC application configured on the Verify tenant to generate an OAuth token. This would be associated with the user account used to login to the application.

Now you can run the test by executing:

```bash
$ npm test
```

If you want to see debug logs, run:

```js
$ npm run testdebug
```
