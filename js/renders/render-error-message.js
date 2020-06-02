const renderError = message => {
    document.getElementsByClassName('error_message')[0].style.display = 'flex'
    document.getElementsByClassName('error_message_text')[0]
    .innerHTML = message
}