*** Comments ***
This is a test script for login and logout function of QikVid app

*** Settings ***
Library    Selenium2Library
Library    XML

*** Variables ***
${BROWSER}    chrome
${URL}    http://localhost:3000
${USERNAME}    ice
${PASSWORD}    12345678
${DELAY}    1.25

*** Test Cases ***
1. Open Browser
    Open Browser    ${URL}    ${BROWSER}    options=add_experimental_option("excludeSwitches", ["enable-logging"])
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
2. Go to Log In Page
    Click Element    id=nav-user-icon
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Log In
3. Enter Log In Account
    Input Text    id=login-username-input    ${USERNAME}
    Input Password    id=login-password-input    ${PASSWORD}
    Click Button    id=login-signin-btn
4. Go To Profile Page
    Click Element    xpath=//*[@id="nav-user-icon"]
    ${LOGIN_USERNAME}    Get Text    xpath=//h2
    Should Contain    ${LOGIN_USERNAME}    ${USERNAME}
    ${LOGOUT_BUTTON}    Get Text    xpath=//*[@id="user-logout-btn"]/div/p
    Should Contain    ${LOGOUT_BUTTON}    Log out
5. Log out
    Click Element    id=user-logout-btn
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Log In
6. Close Browser
    Close Browser
