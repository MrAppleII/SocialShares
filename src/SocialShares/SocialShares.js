import React, { Component } from "react"
import PropTypes from "prop-types"
import FacebookLogoImage from "./icons/facebook_logo.png"
import TwitterLogoImage from "./icons/twitter_logo.png"
import LinkedInLogo from "./icons/linkedin_logo.png"
import copyPasteIcon from "./icons/copy_paste.png"
import styled, {keyframes} from "styled-components"

let linkObjectMap = [
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

let itemBlockGenerator = (Message, Link) => (
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
class SocialShares extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      copyTextString: "Copy Link",
      copyDisplayStatus: true,
      isErrorCurrentlyDisplayed: true, //This is ONLY for the error messaage. Default is true incase we have to show it.
    };
    this.onMaskClick = this.onMaskClick.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  onMaskClick(event) {
    this.props.onModalClose()
  }
  setErrorDisplay() {
    this.setState({
      isCurrentlyDisplayed: true,
    })
  }

  onCopyPaste = () => {
    var textField = document.createElement("textarea")
    textField.innerText = this.props.Link
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
    this.setState({
      copyTextString: "Link Copied to Clipboard!",
      copyDisplayStatus: false,
    })

    setTimeout(
      function() {
        this.setState({
          copyTextString: "Copy Link",
          copyDisplayStatus: true,
        })
      }.bind(this),
      500
    )
  }

  render() {
    const { props, state } = this
    try {
      return props.showModalStatus ? (
        <>

            <ModelMask>
              <ModalWrapper onClick={this.onMaskClick}>
                <ModalContainer
                  onClick={e => {
                    // We are simply preventing the e based function up above from misfiring
                    e.stopPropagation()
                  }}
                  style={{ maxWidth: props.modalWidth }}
                >
                  <ModalHeader>
                    <ModalDefaultButton />

                    <ModalHeaderCenterItem>Share</ModalHeaderCenterItem>

                    <ModalDefaultButton onClick={this.onMaskClick}>
                      X
                    </ModalDefaultButton>
                  </ModalHeader>
                  <ModalBody>
                    {itemBlockGenerator(props.Message, props.Link)}
                    <ShareItemRow onClick={this.onCopyPaste}>
                      <ShareItemRowImage
                        src={copyPasteIcon}
                        height="42"
                        width="42"
                      />
                      <ShareItemText
                        className={
                          this.state.copyDisplayStatus
                            ? ""
                            : "modal-fade-leave-long"
                        }
                      >
                        {this.state.copyTextString}
                      </ShareItemText>
                    </ShareItemRow>
                  </ModalBody>
                  <ModalHeader>
                    <ModalDefaultButton />
                    <ModalHeaderCenterButton>
                      <div onClick={this.onMaskClick}>Cancel</div>
                    </ModalHeaderCenterButton>

                    <ModalDefaultButton />
                  </ModalHeader>
                </ModalContainer>
              </ModalWrapper>
            </ModelMask>

        </>
      ) : null
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }

      let emergencyClose = () => {
        this.setState({
          isErrorCurrentlyDisplayed: false,
        })
      }

      return this.state.isErrorCurrentlyDisplayed ? (

          <ModelMask>
            <ModalWrapper onClick={emergencyClose}>
              <ModalContainer
                onClick={e => {
                  // We are simply preventing the e based function up above from misfiring
                  e.stopPropagation()
                }}
                style={{ maxWidth: "350px" }}
              >
                <ModalHeader>
                  <ModalHeaderCenterItem>Oops</ModalHeaderCenterItem>
                </ModalHeader>
                <ModalBody>
                  <h4 style={{ textAlign: "center" }}>
                    Something went wrong here.
                  </h4>
                </ModalBody>
                <ModalHeader>
                  <ModalDefaultButton />
                  <ModalHeaderCenterButton>
                    <div onClick={emergencyClose}>Okay</div>
                  </ModalHeaderCenterButton>

                  <ModalDefaultButton />
                </ModalHeader>
              </ModalContainer>
            </ModalWrapper>
          </ModelMask>

      ) : null
    }
  }
}
SocialShares.propTypes = {
  showModalStatus: PropTypes.bool,
  Message: PropTypes.string,
  Link: PropTypes.string.isRequired,
  onModalClose: PropTypes.func,
  modalWidth: PropTypes.string,
}
SocialShares.defaultProps = {
  showModalStatus: false,
  Message: "",
  Link: "",
  onModalClose: function() {},
  modalWidth: "350px",
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
/******************************* Copy These Lines for the pop in effect ****************/
const fadeInEffect = keyframes`
from {
  -webkit-transform: scale3d(1.3, 1.3, 1.3);
  transform: scale3d(1.3, 1.3, 1.3);
}
`

const ModalContainer = styled.div`
  z-index: 101;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif !important;
  transition: all 0.3s ease;
  animation: ${fadeInEffect} forwards cubic-bezier(0.2, 0.8, 0.2, 1);;
  animation-duration: 0.13s;
`
/************************************************************************************/
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
