*** Comments ***
This is a test script for play and like video in QikVid App

*** Settings ***
Library    SeleniumLibrary
Library    XML

*** Variables ***
${BROWSER}    chrome
${URL}    http://localhost:3000
${USERNAME}    ice
${PASSWORD}    12345678
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
3. Enter Log In Account
    Input Text    id=login-username-input    ${USERNAME}
    Input Password    id=login-password-input    ${PASSWORD}
    Click Button    id=login-signin-btn
4. Click Play Video
    Sleep    5s
    Click Element    xpath=//*[@id="videoPlayer"]/div[5]
5. Click Shuffle to Play Next Video
    Click Element    xpath=//*[@id="home-shuffle-btn"]
    Sleep   5s
    Click Element    xpath=//*[@id="videoPlayer"]/div[5]
6. Click Like Video
    ${PREV_LIKE_COUNT}    Get Text    xpath=//*[@id="root"]/div/div/div[3]/div/div/div[3]/h4
    ${PREV_LIKE_COUNT}    Convert To Integer    ${PREV_LIKE_COUNT}
    # Log To Console    ${PREV_LIKE_COUNT}
    Click Element    xpath=//*[@id="videocontainer-heart-icon"]
    Sleep    3s
    ${AFTER_LIKE_COUNT}    Get Text    xpath=//*[@id="root"]/div/div/div[3]/div/div/div[3]/h4
    ${AFTER_LIKE_COUNT}    Convert To Integer    ${AFTER_LIKE_COUNT}
    # Log To Console    ${AFTER_LIKE_COUNT}
    ${DIFF}=    Set Variable    ${${AFTER_LIKE_COUNT} - ${PREV_LIKE_COUNT}}
    Should Be Equal As Integers    ${DIFF}    1
7. Click Unlike Video
    ${PREV_LIKE_COUNT}    Get Text    xpath=//*[@id="root"]/div/div/div[3]/div/div/div[3]/h4
    ${PREV_LIKE_COUNT}    Convert To Integer    ${PREV_LIKE_COUNT}
    # Log To Console    ${PREV_LIKE_COUNT}
    Click Element    xpath=//*[@id="videocontainer-heart-icon"]
    Sleep    3s
    ${AFTER_LIKE_COUNT}    Get Text    xpath=//*[@id="root"]/div/div/div[3]/div/div/div[3]/h4
    ${AFTER_LIKE_COUNT}    Convert To Integer    ${AFTER_LIKE_COUNT}
    # Log To Console    ${AFTER_LIKE_COUNT}
    ${DIFF}=    Set Variable    ${${PREV_LIKE_COUNT} - ${AFTER_LIKE_COUNT}}
    Should Be Equal As Integers    ${DIFF}    1
8. Close Browser
    Close Browser