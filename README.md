# IBM Security Verify SDK for Javascript

This repository is for active development of the IBM Security Verify SDK for Javascript.

## Getting started

To get started with a specific component, see the **README.md** file located in each of components project folder.

### Prerequisites

- [node](https://nodejs.org/en) (v16.13.0 or higher)
- A valid IBM Security Verify tenant or IBM Security Verify Access is required.

### Components

Releases of all packages are available here: [Releases](https://github.com/ibm-security-verify/verify-sdk-javascript/tags)

The following components are currently offered in the package.
| Component | Description |
| ----------- | ----------- |
| [Privacy](sdk/privacy) | Fast, opinionated, simple privacy component that leverages the data privacy & consent engine on IBM Verify. |
| [Examples](examples/) | Collection of **demo applications** that illustrate common server-side scenarios supporting mobile identity, authentication, and digital credential use cases. |

### Installation

Install using [Node Package Manager](https://www.npmjs.com):

```javascript
# install the privacy sdk
npm i @ibm-verify/privacy
```

The above command will add the Privacy SDK to the `dependencies` section of the your `package.json`, as shown in the following example:

```javascript
"dependencies": {
    "@ibm-verify/privacy": "^1.0.0"
}
```
