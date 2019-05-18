import React, { useState } from "react"
import PropTypes from "prop-types"
import "./animation.css"
import FacebookLogoImage from "./icons/facebook_logo.png"
import TwitterLogoImage from "./icons/twitter_logo.png"
import LinkedInLogo from "./icons/linkedin_logo.png"
import copyPasteIcon from "./icons/copy_paste.png"
import styled from "styled-components"

const linkObjectMap = [
  {
    name: "Facebook",
    linkUri: "https://www.facebook.com/sharer/sharer.php?u=",
    image: FacebookLogoImage,
    messageText: "Share To Facebook",
  },

  {
    name: "LinkedIn",
    linkUri:
      "https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=LinkedIn%20Developer%20Network&summary=My%20favorite%20developer%20program&source=LinkedIn",
    image: LinkedInLogo,
    messageText: "Share To LinkedIn",
  },
  {
    name: "Twitter",
    linkUri: "https://twitter.com/home?status=",
    image: TwitterLogoImage,
    messageText: "Share To Twitter",
  },
]

const itemBlockGenerator = (Message, Link) => (
  <>
    {linkObjectMap.map((shareItemLink, i) => {
      let handreturnLink = () => {
        var finalString = ""
        if (shareItemLink.name === "Facebook") {
          finalString = shareItemLink.linkUri + Link
        } else if (shareItemLink.name === "LinkedIn") {
          var title = "wow test title"
          finalString =
            "https://www.linkedin.com/shareArticle?mini=true&url=" +
            encodeURIComponent(Link) +
            "&title=" +
            title +
            "&summary=" +
            Message +
            "&source="
        } else {
          finalString = shareItemLink.linkUri + Link + " " + Message
        }
        window.open(finalString)
      }
      return (
        <div key={i}>
          <ShareItemRow onClick={handreturnLink}>
            <ShareItemRowImage
              src={shareItemLink.image}
              height="42"
              width="42"
            />
            <ShareItemText>{shareItemLink.messageText}</ShareItemText>
          </ShareItemRow>
        </div>
      )
    })}
  </>
)
SocialShares.propTypes = {
  showModalStatus: PropTypes.bool,
  Message: PropTypes.string,
  Link: PropTypes.string.isRequired,
  onModalClose: PropTypes.func,
  onModalOpen: PropTypes.func,
  modalWidth: PropTypes.string,
}
SocialShares.defaultProps = {
  showModalStatus: true,
  Message: "",
  onModalClose: () => {},
  onModalOpen: () => {},
  modalWidth: "350px",
}

function SocialShares({
  showModalStatus,
  Message,
  Link,
  onModalClose,
  openModal,

  modalWidth,
}) {
  const [copyTextString, setCopyString] = useState("Copy Link")
  const [copyDisplayStatus, setCopyDisplayStatus] = useState(true)

  const onMaskClick = e => {
    onModalClose()
  }
  const onCopyPaste = () => {
    var textField = document.createElement("textarea")
    textField.innerText = Link
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()

    setCopyString("Link Copied to Clipboard!")

    setCopyDisplayStatus(false)

    setTimeout(
      function() {
        //Start the timer
        setCopyString("Copy Link") //After 1 second, set render to true
        setCopyDisplayStatus(true)
      },
      500
    )
  }
  try {
    return showModalStatus ? (
      <>
        <div className="modal-fade-enter">
          <ModelMask>
            <ModalWrapper onClick={onMaskClick}>
              <ModalContainer
                onClick={e => {
                  // We are simply preventing the e based function up above from misfiring
                  e.stopPropagation()
                }}
                style={{ maxWidth: modalWidth }}
              >
                <ModalHeader>
                  <ModalDefaultButton />

                  <ModalHeaderCenterItem>Share</ModalHeaderCenterItem>

                  <ModalDefaultButton onClick={onModalClose}>
                    X
                  </ModalDefaultButton>
                </ModalHeader>
                <ModalBody>
                  {itemBlockGenerator(Message, Link)}
                  <ShareItemRow onClick={onCopyPaste}>
                    <ShareItemRowImage
                      src={copyPasteIcon}
                      height="42"
                      width="42"
                    />
                    <ShareItemText
                      className={
                        copyDisplayStatus
                          ? "modal-fade-enter"
                          : "modal-fade-leave-long"
                      }
                    >
                      {copyTextString}
                    </ShareItemText>
                  </ShareItemRow>
                </ModalBody>
                <ModalHeader>
                  <ModalDefaultButton />
                  <ModalHeaderCenterButton>
                    <div onClick={onModalClose}>Cancel</div>
                  </ModalHeaderCenterButton>

                  <ModalDefaultButton />
                </ModalHeader>
              </ModalContainer>
            </ModalWrapper>
          </ModelMask>
        </div>
      </>
    ) : null
  } catch {
    return (
      <div className="modal-fade-enter">
        <ModelMask>
          <ModalWrapper onClick={onMaskClick}>
            <ModalContainer
              onClick={e => {
                // We are simply preventing the e based function up above from misfiring
                e.stopPropagation()
              }}
            >
              <ModalHeader>
                <ModalHeaderCenterItem>Oops</ModalHeaderCenterItem>
              </ModalHeader>
              <ModalBody>Something went wrong here.</ModalBody>
              <ModalHeader>
                <ModalDefaultButton />
                <ModalHeaderCenterButton>
                  <div onClick={onModalClose}>Okay</div>
                </ModalHeaderCenterButton>

                <ModalDefaultButton />
              </ModalHeader>
            </ModalContainer>
          </ModalWrapper>
        </ModelMask>
      </div>
    )
  }
}

// Styling for the Modal Components **********
const ModelMask = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
`
/* This styling is for the corner buttons containing the content */

const ModalDefaultButton = styled.a`
  flex: 0 0 12px;
  cursor: pointer;
  font-weight: normal !important;
`
const ModalWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`
/* This styling is for the actual border containing the content */
const ModalContainer = styled.div`
  z-index: 101;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important;
  transition: all 0.3s ease;
`
const ModalHeaderCenterItem = styled.div`
  flex-grow: 1;
  text-align: center;
`
const ModalHeaderCenterButton = styled.div`
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
`
const ModalHeader = styled.h3`
  margin-top: 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ModalBody = styled.div`
  margin: 20px 0;
`
// Begin Styling for Items in Modal ************
const ShareItemRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
`
const ShareItemText = styled.h4`
  flex: 1;
`
const ShareItemRowImage = styled.img`
  align-items: center;
  margin-right: 1rem;
  justify-content: center;
`

export default SocialShares
