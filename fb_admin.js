const firebase = require("firebase-admin");
const serviceAccount = {
  "type": "service_account",
  "project_id": "blue-standard",
  "private_key_id": "4c866038908148661209986162bec5304f516055",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCh9iPJtc3bN9Vu\nv0clj71CmzxV7F5BiqAhqA3tZaaPJvIZ2zr4khFBpdjmQoLQp7mf020pXBKQe3mc\n/KI+7m4P13ffUucDqyq75FgXMzV/rTeSJhvPNviqQs5VE7VBVRPgqb99kaLvFTbL\nlb7/oMLDe3sN3LojboRlxGCFUE0PyrIOEBl5QPcJCVtYeBwoPOQlgupfTBF7z/G6\nNlfFSG2H8dRejmVJYmG1epqlATBkW4DyfShFM0YGgLIEkuhyGaeXLoFa88KFVtjL\nhjhdMGdBLxoRXEYJGvo4UTaVMtmqNqP3G5THeR7WBCnO+xrAU7qaNW3FaxHI5SGK\nWFQKZBl5AgMBAAECggEABLxR9RCqDX4fMT8KCUTf643m8Hs6EVAImRtVFuspONfS\nbeOdYI3Cz+jVw/vPX+L7mDsCHtq4lz1pA6hWZSErGi76bA78Prz3QamuUrVWW96Y\neJ9BImiw0iekaVPrcZbXfzLvbLBAs51q7f55qHdOopEeerwIvEb7u48HpHZB3pOK\ncs16skLr4chRNNIzOy3RtJR6LGv4yBAdsxJExt8qKP680EsqCMvzRmD2hDGw1iHA\nA8zT3ieDHleb238+2DGWC456cOn+l8NfRHDBXXxlKpSgwJ27rbr+mJnEtnOIN0tP\no1ppza3ALQUdlv8HkD/juZsM8UH8K/GTChFPRwf9YQKBgQDiAGrqMYr14gO+3oSX\ndUwBIP6w6dQ8RXIj3mJ1BAhZp9bXiyl0vi2fG0XpZZr4/xBxWB0NtsgbCjYasQun\nLHl6Y5beD2E59SldhnycsNiE2uEbTW3f1/rTtE2kG4Ne21qnPtr3fzFZNxju+LDn\nH885TNDkhebNhksUTXTr5YAqyQKBgQC3dZ/oaNwo76/yBmea0zJ/PHfVRtMEZl+0\nyOUbNo3KthH+2+Fn2UK2ET1sZGkeNBXnfBIP8CAeR7VW8/6kgdpCFwiPCWKSe0Zc\nABED4L6H/jIHjMrKU16P6Kl0UgrE4DkT+gHe9ww94uEg+L3AstwUW1mTMW6iQNUJ\nLXp0sJghMQKBgQCPqo5Mk/PvPJ7+7btCAMmxCgV99xb4vXjCfnL+SfL4823qlUdk\nNCUSOKcnqHRshtAwDUBi4GeycLpWG2f5/Ja4i6hzPzmiO0vxbTW38d+iDPX+gikv\nm7+SZtLYWLkZSr4FBTrzDEMVoKXT+/mQ4zK7DS7ZpplC23TM0jRaZQklqQKBgFfP\nLOKIjhfp4UTuW9h3DcxonNKwO3/3oAdfwIjt66AC1Uou5AxYqN2MEuI2jTmvpGxP\nrjWCsVzM5bbgwhjrLhREAgy0aUHDT0Hppjs87vUYbcm/UbDVhoVKzxCl1BG3YJp3\nJz4Y8PsOBMNLS0dYVI5Jyu3w0wtGDLF/2wTPIYGBAoGActW9lsTzTgFDG8QxSqKY\nrXtDAFnFoN+W5EZLjCsODFTIVZ5h1MlXnMyixIob4SZTkub7Q2/GviCCskF0q+8D\n7LUEi62FG9j7HiiVVZuePAm03zxn6YFcLoX9AgArrfX0788Fr5ztRBGd4gjpZ7PN\nzX79LTR9oOqK6HqTIiRL204=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-cu29b@blue-standard.iam.gserviceaccount.com",
  "client_id": "101411576945479338260",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cu29b%40blue-standard.iam.gserviceaccount.com"
};
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
module.exports = firebase;