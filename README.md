# SocialShares
Social Shares is a react component that can share a link in a new tab.

# How to use it

There are a few props that can be passed it and a few that must be passed in.
  
showModalStatus: PropTypes.bool (Default is false).

Message: PropTypes.string (default is blank).

Link: PropTypes.string.isRequired (this is the link we are sharing).

onModalClose: PropTypes.func (this function is called when "Cancel" and "X" is clicked, default is do nothing).

onModalOpen: PropTypes.func,  (this function is called as soon as the modal opens. Default is nothing).
  
modalWidth: PropTypes.string, (this sets the width of the Modal, default is 350px ).
