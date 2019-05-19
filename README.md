# SocialShares
Social Shares is a react component that can share a link in a new tab.

# How to use it

There are a few props that can be passed it and a few that must be passed in.
  
showModalStatus: bool (Determines if we are show the modal. Default is false).

Message: string (This message is used for twitter posts. default is blank).

Link: string *Required* (this is the link we are sharing).

onModalClose: function (this function is called when "Cancel" and "X" is clicked, default is do nothing).
  
modalWidth: string (this sets the width of the Modal, default is 350px. Example Format: "550px"  ).
