*** Comments ***
This is a test script for user sign up function of QikVid App

*** Settings ***
Library    SeleniumLibrary
Library    XML

*** Variables ***
${BROWSER}    chrome
${URL}    http://localhost:3000
${USERNAME}    testing2                    # Please change the username every time you run the script
${PASSWORD}    testing123
${EMAIL}    testing_user2@gmail.com        # Please change the email every time you run the script
${DELAY}    0.5

*** Test Cases ***
1. Open Browser
    Open Browser    ${URL}    ${BROWSER}    options=add_experimental_option("excludeSwitches", ["enable-logging"])
    Maximize Browser Window
    Set Screenshot Directory    ./testing/screenshot
    Set Selenium Speed    ${DELAY}
2. Go to Log In Page
    Click Element    id=nav-user-icon
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Log In
3. Go to Sign Up Page
    Click Element    xpath=//*[@id="login-signup-hyperlink"]
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Sign Up
4. Fill in Sign Up Form
    Input Text    id=signup-username-input    ${USERNAME}
    Input Text    id=signup-email-input    ${EMAIL}
    Input Password    id=signup-password-input    ${PASSWORD}
    Input Password    id=signup-confrim-password-input    ${PASSWORD}
    Click Button    id=signup-signup-btn
5. Check Alert Text Message
    Alert Should Be Present    timeout=10 s    text=Sign up successfully
6. Check User Name
    Input Text    id=login-username-input    ${USERNAME}
    Input Password    id=login-password-input    ${PASSWORD}
    Click Button    id=login-signin-btn
7. Go To Profile Page
    Click Element    xpath=//*[@id="nav-user-icon"]
    ${LOGIN_USERNAME}    Get Text    xpath=//h2
    Should Contain    ${LOGIN_USERNAME}    ${USERNAME}
    ${LOGOUT_BUTTON}    Get Text    xpath=//*[@id="user-logout-btn"]/div/p
    Should Contain    ${LOGOUT_BUTTON}    Log out
8. Log Out
    Click Element    xpath=//*[@id="user-logout-btn"]
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Log In
9. Close Browser
    Close Browser
