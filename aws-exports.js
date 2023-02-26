/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "https://qjkvvgv75fe5daaavqkdjuhgou.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_tLTUaFeeq",
    "aws_user_pools_web_client_id": "48d0ig6qvd3cbh6qfk60t4g75q",
    "oauth": {
        "domain": "auth.aleks.tech.auth.us-east-1.amazoncognito.com",
        "scope": [
            "aws.cognito.signin.user.admin",
            "email",
            "openid",
            "profile"
        ],
        "redirectSignIn": "https://aleks.tech/auth/oauth,https://aleks.tech:3000/auth/oauth,https://preview.aleks.tech/auth/oauth",
        "redirectSignOut": "https://aleks.tech/auth/logout,https://aleks.tech:3000/auth/logout,https://preview.aleks.tech/auth/logout",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
