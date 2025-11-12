# IBM Verify Privacy SDK examples

A set of examples are provided in this repository to showcase the use of the [IBM Verify SDK for Javascript](https://github.com/ibm-verify/verify-sdk-javascript).

## Pre-requisites

1. Install Node and Git on your machine
2. [Create a tenant on IBM Verify](https://docs.verify.ibm.com/verify/docs/signing-up-for-a-free-trial)
3. Clone this repo to your machine

## Setup

There is currently only one sample available that runs on the command line interface to illustrate the flow.

### CLI Example

#### Configuration

In the dotenv file, you will notice the following -

* TENANT_URL: This is your IBM Verify tenant URL. Notice the protocol is included and there is no trailing slash.
* APP_CLIENT_ID: This is an OIDC application client_id configured on IBM Verify and enabled with the ROPC grant type.
* APP_CLIENT_SECRET: This is an OIDC application client_secret configured on IBM Verify and enabled with the ROPC grant type.
* USERNAME: This is a Cloud Directory user on the IBM Verify tenant. This can be left unconfigured and the sample app will prompt for the username on the command-line.
* PASSWORD: This is the Cloud Directory user password on the IBM Verify tenant. This can be left unconfigured and the sample app will prompt for the username on the command-line.
* CONSENT_ITEMS: This is a representation of items that this app requires consent/approval to perform some hypothetical activities. The format differs for EULA vs attributes. The IDs mentioned below can be copied from your IBM Verify tenant admin console. Choosing friendly names for those identifiers is highly recommended.
    - The format for an purpose-aware attribute item is `purposeID/attributeID:accessTypeID`.
    - The format for a EULA item is `eulaID`

#### Setup IBM Verify

If you intend to use the `dotenv` as-is, ensure that steps 2 and 3 are completed. Otherwise, you will need to modify the `CONSENT_ITEMS`.

1. Create an OIDC application on IBM Verify with ROPC grant enabled. Note the `client_id` and `client_secret`.
2. In the IBM Verify Admin Console > Data Privacy section, create a "Purpose" with ID `marketing` and add `email` attribute to it. Choose `default` as the access type.
3. In the IBM Verify Admin Console > Data Privacy section, create a EULA with ID `defaultEULA`.

#### Run the sample

1. Install node dependencies

    ```bash
    npm install
    ```

2. Run the application.

    ```bash
    node cli/cli.js
    ```

3. Follow the cues

#### Terms

* ASSESSMENT: This is the assessment performed for the requested items against the privacy rules configured
* METADATA: This is the metadata used to build the consent page (or in this case, the consent prompts on the command-line)
