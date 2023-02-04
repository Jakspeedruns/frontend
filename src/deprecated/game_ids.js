// Retrieve via:
// https://www.speedrun.com/api/v1/games/<GAME_NAME>?embed=categories.variables

const jak2VersionVariable = {
  "original": {
    id: "5lyg6yl4",
    val: "zqojwdp1"
  },
  "hd-collection": {
    id: "5lyg6yl4",
    val: "013xe3d1"
  },
  "2017": {
    id: "5lyg6yl4",
    val: "p125me71"
  }
}

const jak3VersionVariable = {
  "original": {
    id: "e8m1vx86",
    val: "rqvxw37l"
  },
  "hd-collection": {
    id: "e8m1vx86",
    val: "5lengd5l"
  },
}

const trifectaVersionVariable = {
  "original": {
    id: "jlz3yy82",
    val: "8149e30q"
  },
  "hd-collection": {
    id: "jlz3yy82",
    val: "z19xg701"
  },
}

export const gameIds = {
  "daxter": {
    id: "n26847dp",
    categories: {
      "any": {
        id: "rklxpwkn",
        subcategories: {}
      },
      "all-missions": {
        id: "9kvxmj2g",
        subcategories: {}
      },
      "hundred-and-one": {
        id: "ndxjgj2q",
        subcategories: {}
      },
    }
  },
  "jak1": {
    id: "xkdk4g1m",
    categories: {
      "no-lts": {
        id: "5dw8r40d",
        subcategories: {
          "lava-walk-no": {
            id: "7896v168",
            val: "4qyee3d1"
          },
          "lava-walk-yes": {
            id: "7896v168",
            val: "mln66rnq"
          }
        }
      },
      "no-fcs": {
        id: "rkllg7qk",
        subcategories: {}
      },
      "any": {
        id: "jdrqj0k6",
        subcategories: {}
      },
      "hundred": {
        id: "02qgyzdy",
        subcategories: {}
      },
      "orbless": {
        id: "824x53d5",
        subcategories: {}
      },
      "no-major-skips": {
        id: "02qyyydy",
        subcategories: {}
      },
      "all-orbs": {
        id: "q25oj1vk",
        subcategories: {}
      },
      "all-flies": {
      id: "02qjn8pd",
      subcategories: {}
      }
    }
  },
  "jak2": {
    id: "ok6qlo1g",
    categories: {
      "any": {
        id: "wdmze42q",
        subcategories: jak2VersionVariable
      },
      "any-hoverless": {
        id: "xd1rxxrk",
        subcategories: jak2VersionVariable
      },
      "all-missions": {
        id: "mkeon9d6",
        subcategories: jak2VersionVariable
      },
      "hundred": {
        id: "7dg8q424",
        subcategories: jak2VersionVariable
      },
      "any-all-orbs": {
        id: "wkpj7vkr",
        subcategories: jak2VersionVariable
      },
      "any-hero-mode": {
        id: "vdo0jodp",
        subcategories: jak2VersionVariable
      }
    }
  },
  "jak3": {
    id: "nj1nww1p",
    categories: {
      "any": {
        id: "9d8p1qkn",
        subcategories: jak3VersionVariable
      },
      "any-hero-mode": {
        id: "9kvp50kg",
        subcategories: jak3VersionVariable
      },
      "any-no-oob": {
        id: "5dwj0n0k",
        subcategories: jak3VersionVariable
      },
      "all-missions": {
        id: "xd1r98k8",
        subcategories: jak3VersionVariable
      },
      "hundred": {
        id: "zd30nndn",
        subcategories: jak3VersionVariable
      },
      "any-all-orbs": {
        id: "jdzw79vd",
        subcategories: jak3VersionVariable
      }
    }
  },
  "jaktlf": {
    id: "m9dogm6p",
    categories: {
      "any": {
        id: "q25oywko",
        subcategories: {}
      },
      "hundred": {
        id: "jdrqz0k6",
        subcategories: {}
      },
      "any-hero-mode": {
        id: "xk9eyjy2",
        subcategories: {}
      },
      "hundred-and-one": {
        id: "z279ood0",
        subcategories: {}
      },
      "hero-mode-no-sps": {
        id: "xk99ngk0",
        subcategories: {}
      }
    }
  },
  "jakx": {
    id: "xldeq5d3",
    categories: {
      "any": {
        id: "5dwjogkg",
        subcategories: {}
      },
      "hundred": {
        id: "wk6p9ed1",
        subcategories: {}
      },
      "any-hero-mode": {
        id: "n2yqweko",
        subcategories: {}
      },
      "100-hero-mode": {
        id: "7kjvxgk3",
        subcategories: {}
      },
      "all-cups": {
        id: "9kvm8xek",
        subcategories: {}
      }
    }
  },
  "trifecta": {
    id: "n268l71p",
    categories: {
      "any": {
        id: "5dwp5nkg",
        subcategories: trifectaVersionVariable
      },
      "hundred": {
        id: "wk6j7rd1",
        subcategories: trifectaVersionVariable
      },
      "any-debug": {
        id: "xd1ezxr2",
        subcategories: trifectaVersionVariable
      }
    }
  },
  "jakext": {
    id: "kdkz25qd",
    categories: {
      "jak1": {
        id: "zdnx3y92",
           subcategories: {
              "low-eco": {
                  id: "6njqpm5l",
                  val: "jqzxvd21"
              },
              "any-debug": {
                  id: "6njqpm5l",
                  val: "klryjmoq"
              },
              "100-hub1": {
                  id: "6njqpm5l",
                  val: "5lmgx40l"
              },
              "100-hub2": {
                  id: "6njqpm5l",
                  val: "81w5md61"
              },
              "100-hub3": {
                  id: "6njqpm5l",
                  val: "zqory34q"
              },
              "new-game-plus": {
                  id: "6njqpm5l",
                  val: "p12x5ykl"
              },
              "new-game-plus-no-lw": {
                  id: "6njqpm5l",
                  val: "4qyeyo61"
              },
              "52-pickup": {
                  id: "6njqpm5l",
                  val: "81pd7mk1"
              },
              "all-flies-and-orbs": {
                  id: "6njqpm5l",
                  val: "81472ev1"
              },
              "orbless-max": {
                  id: "6njqpm5l",
                  val: "jqzx42m1"
              },
              "9-eco": {
                  id: "6njqpm5l",
                  val: "81w5e951"
              },
              "10-eco": {
                  id: "6njqpm5l",
                  val: "zqorm92q"
              },
              "1-x-press": {
                  id: "6njqpm5l",
                  val: "p123ky2l"
              },
              "100-debug": {
                  id: "6njqpm5l",
                  val: "z197vo4l"
              },
              "no-damage": {
                  id: "6njqpm5l",
                  val: "0q5k6xnq"
              },
              "kill-all-animals": {
                  id: "6njqpm5l",
                  val: "4qyo5g4l"
              },
              "all-cutscenes": {
                  id: "6njqpm5l",
                  val: "21dggd31"
              },
              "new-game-plus-all-flies": {
                  id: "6njqpm5l",
                  val: "p12drp4q"
              },
              "dark-glitch-no-lts": {
                  id: "6njqpm5l",
                  val: "4qyd424q"
              }/**,
              "muse": {
                  id: "6njqpm5l",
                  val: "gq7mnnpq"
              }**/
           }
      },
      "jak2": {
        id: "q253p1vk",
        subcategories: {
          "gunless": {
            id: "kn0zey08",
            val: "21g2e7ml"
          },
          "any-debug": {
            id: "kn0zey08",
            val: "5q8d2pkl"
          },
          "developer-picture": {
            id: "kn0zey08",
            val: "gq7rnpyl"
          },
          "ashelin-stalker": {
            id: "kn0zey08",
            val: "4lxeyw41"
          },
          "all-missions-act-1": {
            id: "kn0zey08",
            val: "21d32zpq"
          },
          "any-mirrored": {
            id: "kn0zey08",
            val: "4lx309rl"
          }
        }
      },
      "jak3": {
        id: "jdre0n5k",
        subcategories: {
          "any-debug": {
            id: "ql649vw8",
            val: "jqzxvdm1"
          },
          "all-open-orbs": {
            id: "ql649vw8",
            val: "rqvzdry1"
          },
          "hero-mode-all-bosses": {
            id: "ql649vw8",
            val: "814e7dkl"
          }
        }
      },
      "jak2-flash-game": {
        id: "9d8xw572",
        subcategories: {
          "any": {
            id: "wlex31r8",
            val: "p12xopkl"
          },
          "any-hero-mode": {
            id: "wlex31r8",
            val: "81pd42k1"
          }
        }
      },
      "daxter": {
        id: "02qpxryd",
        subcategories: {
          "all-masks": {
            id: "0nwky65n",
            val: "rqve69w1"
          }
        }
      }
    }
  }
}
