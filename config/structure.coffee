# Read more about app structure at http://docs.appgyver.com

module.exports =
  initialView:
    id: "initialView"
    location: "example#initial-view"

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css

   rootView:
     location: "example#getting-started"

  preloads: [
    {
      id: "learn-more"
      location: "example#getting-started"
    }

  ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #

