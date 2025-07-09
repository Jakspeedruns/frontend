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

const jakxVersionVariable = {
  "console": {
    id: "9l7yjo9l",
    val: "q8k0dxkq"
  },
  "emulator": {
    id: "9l7yjo9l",
    val: "qyzyjv71"
  },
}

const jak1extVersionVariable = {
  "original": {
    id: "ylpqe9r8",
    val: "jqzjpx2l"
  },
  "hd-collection": {
    id: "ylpqe9r8",
    val: "21d0z3pq"
  },
  "2017": {
    id: "ylpqe9r8",
    val: "klrgpyoq"
  }
}

const jak2extVersionVariable = {
  "original": {
    id: "0nw0owrl",
    val: "zqo4pep1"
  },
  "hd-collection": {
    id: "0nw0owrl",
    val: "rqv8p271"
  },
  "2017": {
    id: "0nw0owrl",
    val: "013g8kdl"
  }
}

const jak3extVersionVariable = {
  "original": {
    id: "0nw0oqxl",
    val: "9qj3v43l"
  },
  "hd-collection": {
    id: "0nw0oqxl",
    val: "5lm5v4mq"
  },
  "2017": {
    id: "0nw0oqxl",
    val: "jq6dnxj1"
  }
}

const jakxextVersionVariable = {
  "console": {
    id: "kn0k5rd8",
    val: "q65z8wnl"
  },
  "emulator": {
    id: "kn0k5rd8",
    val: "lmog7ey1"
  }
}

export const gameIds = {
  "jak1": {
    id: "xkdk4g1m",
    categories: {
      "no-lts": {
        id: "5dw8r40d",
        subcategories: {}
      },
      "no-fcs": {
        id: "rkllg7qk",
        subcategories: {}
      },
      "any": {
        id: "jdrqj0k6",
        subcategories: {}
      },
      "100": {
        id: "02qgyzdy",
        subcategories: {}
      },
      "orbless": {
        id: "824x53d5",
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
  "jak1ext": {//Unsure if this works for multiple subcategories
    id: "3dxkp3g1",
    categories: {
      "no-lts-ext": {
        id: "vdopw3o2",
        subcategories: {
          "no-major-skips": {
            id: "r8r4137n",
            val: "013g8mxl"
          },
          "no-damage": {
            id: "r8r4137n",
            val: "gq78jgd1"
          },
          "dark-glitch": {
            id: "r8r4137n",
            val: "21gm8g81"
          },
          jak1extVersionVariable
        }
      },
      "debug": {
        id: "02qeyo72",
        subcategories: {
          "any": {
            id: "rn1j0x1n",
            val: "5lejr8k1"
          },
          "100": {
            id: "rn1j0x1n",
            val: "0q5rn821"
          },
          jak1extVersionVariable
        }
      },
      "100-hub-runs": {
        id: "9d8516wd",
        subcategories: {
          "hub-1": {
            id: "j84dexw8",
            val: "zqo4pnx1"
          },
          "hub-2": {
            id: "j84dexw8",
            val: "013g8rxl"
          },
          "hub-3": {
            id: "j84dexw8",
            val: "rqv8pd61"
          },
          jak1extVersionVariable
        }
      },
      "ng-plus": {
        id: "xd1w9ez2",
        subcategories: {
          "lava-walk": {
            id: "p8554738",
            val: "4lxnp441"
          },
          "no-lava-walk": {
            id: "p8554738",
            val: "814zydvl"
          },
          "all-flies": {
            id: "p8554738",
            val: "p127dw4q"
          },
          "all-orbs": {
            id: "p8554738",
            val: "12vv2y4q"
          },
          jak1extVersionVariable
        }
      },
      "low-eco": {
        id: "jdzr18r2",
        subcategories: {
          "lowest": {
            id: "38dmz3z8",
            val: "z19nmr8q"
          },
          "10-eco": {
            id: "38dmz3z8",
            val: "p127dz4q"
          },
          "9-eco": {
            id: "38dmz3z8",
            val: "81p9pn8q"
          },
          jak1extVersionVariable
        }
      },
      "orbless-max": {
        id: "9d8516qd",
        subcategories: jak1extVersionVariable
      },
      "1-x-press": {
        id: "rkl04jwk",
        subcategories: jak1extVersionVariable
      },
      "all-flies-and-orbs": {
        id: "9kvr5me2",
        subcategories: jak1extVersionVariable
      },
      "52-pickup": {
        id: "zd35n6ek",
        subcategories: jak1extVersionVariable
      },
      "kill-all-animals": {
        id: "ndxrz1jd",
        subcategories: jak1extVersionVariable
      },
      "all-cutscenes": {
        id: "w20ejyzd",
        subcategories: jak1extVersionVariable
      },
      "muse": {
        id: "wkpg6vvk",
        subcategories: jak1extVersionVariable
      },
      "no-bs": {
        id: "7dg1l94d",
        subcategories: jak1extVersionVariable
      },
      "all-flies-low-collectables": {
        id: "mkew3r9k",
        subcategories: jak1extVersionVariable
      }
    }//Could add bingo
  },
  "jak2": {
    id: "ok6qlo1g",
    categories: {
      "any": {
        id: "wdmze42q",
        subcategories: {}
      },
      "any-hoverless": {
        id: "xd1rxxrk",
        subcategories: {}
      },
      "all-missions": {
        id: "mkeon9d6",
        subcategories: {}
      },
      "100": {
        id: "7dg8q424",
        subcategories: {}
      },
      "any-all-orbs": {
        id: "wkpj7vkr",
        subcategories: {}
      },
      "any-hero-mode": {
        id: "vdo0jodp",
        subcategories: {}
      }
    }
  },
  "jak2ext": {//Unsure if this works for multiple subcategories
    id: "v1pxqgm6",
    categories: {
      "all-missions": {
        id: "vdopw3o2",
        subcategories: {
          "act-1": {
            id: "6njk4ejl",
            val: "klrgpkjq"
          },
          "act-2": {
            id: "6njk4ejl",
            val: "21d0z84q"
          },
          "act-3": {
            id: "6njk4ejl",
            val: "5q8y6vgl"
          },
          jak2extVersionVariable
        }
      },
      "any-exts": {
        id: "rkl04zrk",
        subcategories: {
          "no-damage": {
            id: "ylpqerr8",
            val: "5lm5k3jq"
          },
          "mirrored": {
            id: "ylpqerr8",
            val: "81wyp2oq"
          },
          jak2extVersionVariable
        }
      },
      "any-segments": {
        id: "w20ej58d",
        subcategories: {
          "1-3": {
            id: "ql6r73kl",
            val: "8104znwl"
          },
          "2-3": {
            id: "ql6r73kl",
            val: "9qj30mel"
          },
          "3-3": {
            id: "ql6r73kl",
            val: "jq6d0o31"
          },
          jak2extVersionVariable
        }
      },
      "debug": {
        id: "xd1w9q72",
        subcategories: jak2extVersionVariable
      },
      "gunless": {
        id: "9d851n6d",
        subcategories: jak2extVersionVariable
      },
      "ashelin-stalker": {
        id: "zd35nr8k",
        subcategories: jak2extVersionVariable
      },
      "all-open-orbs-endgame": {
        id: "vdopwny2",
        subcategories: {
          "no": {
            id: "kn00jxon",
            val: "mlnxwv0q"
          },
          "yes": {
            id: "kn00jxon",
            val: "4qy0p24l"
          },
          jak2extVersionVariable
        }
      },
      "developer-picture": {
        id: "n2yrw6zd",
        subcategories: jak2extVersionVariable
      },
      "praxis-1": {
        id: "wdmmg75d",
        subcategories: jak2extVersionVariable
      },
      "im-gonna-kill-praxis": {
        id: "ndxrz05d",
        subcategories: jak2extVersionVariable
      }
    }
  },
  "jak3": {
    id: "nj1nww1p",
    categories: {
      "any": {
        id: "9d8p1qkn",
        subcategories: {}
      },
      "any-hero-mode": {
        id: "9kvp50kg",
        subcategories: {}
      },
      "any-no-oob": {
        id: "5dwj0n0k",
        subcategories: {}
      },
      "all-missions": {
        id: "xd1r98k8",
        subcategories: {}
      },
      "100": {
        id: "zd30nndn",
        subcategories: {}
      },
      "any-all-orbs": {
        id: "jdzw79vd",
        subcategories: {}
      }
    }
  },
  "jak3ext": {//Unsure if this works for multiple subcategories
    id: "76r3eg46",
    categories: {
      "all-missions-acts": {
        id: "q255rn82",
        subcategories: {
          "act-1": {
            id: "789d6y0n",
            val: "klrgpkjq"
          },
          "act-2": {
            id: "789d6y0n",
            val: "21d0z84q"
          },
          "act-3": {
            id: "789d6y0n",
            val: "5q8y6vgl"
          },
          "normal": {
            id: "2lg1rwol",
            val: "rqv8ge61"
          },
          "ng-plus": {
            id: "2lg1rwol",
            val: "5lej9mk1"
          },
          jak3extVersionVariable
        }
      },
      "no-oob-ng-plus": {
        id: "jdzr1mv2",
        subcategories: jak3extVersionVariable
      },
      "all-bosses-ng-plus": {
        id: "jdrwj5xk",
        subcategories: jak3extVersionVariable
      },
      "all-satellites-ng-plus": {
        id: "824q57gk",
        subcategories: jak3extVersionVariable
      },
      "jetboardless-ng-plus": {
        id: "02qeynp2",
        subcategories: jak3extVersionVariable
      },
      "debug": {
        id: "z2758qgk",
        subcategories: jak3extVersionVariable
      },
      "hero-mode-hoverless": {
        id: "zd3m5682",
        subcategories: jak3extVersionVariable
      },
      "all-open-orbs": {
        id: "zdnoejq2",
        subcategories: jak3extVersionVariable
      },
      "all-open-orbs-post-game": {
        id: "q25plowd",
        subcategories: jak3extVersionVariable
      },
      "gunless": {
        id: "8243mwnd",
        subcategories: {
          "fresh-file": {
            id: "rn1ymmvn",
            val: "lx5ew421"
          },
          "hero-mode": {
            id: "rn1ymmvn",
            val: "14o7ed0q"
          },
          jak3extVersionVariable
        }
      },
      "no-oob-restricted": {
        id: "7dgjoz4d",
        subcategories: jak3extVersionVariable
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
      "100": {
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
        subcategories: {/**
          "skips": {
            id: "2lg155el",
            val: "8104kwpl"
          },
          "no-skips": {
            id: "2lg155el",
            val: "9qj3kxol"
          }**/
        }
      }
    }
  },
  "jakxext": {//Unsure if this works for multiple subcategories
    id: "46w28796",
    categories: {
      "all-story-arenas": {
        id: "mke71762",
        subcategories: jakxextVersionVariable
      },
      "all-cups-and-qualifiers": {
        id: "5dwx3xl2",
        subcategories: {
          "skips": {
            id: "9l75j748",
            val: "zqovre41"
          },
          "no-skips": {
            id: "9l75j748",
            val: "01365ky1"
          },
          jakxextVersionVariable
        }
      },
      "24-tracks": {
        id: "wk64q4xd",
        subcategories: {
          "skips": {
            id: "rn1jo0pn",
            val: "klr2yk01"
          },
          "no-skips": {
            id: "rn1jo0pn",
            val: "gq7xr3rl"
          },
          jakxextVersionVariable
        }
      },
      "all-tours": {
        id: "7kj4o5nk",
        subcategories: {
          "skips": {
            id: "38dm2gz8",
            val: "le26y36l"
          },
          "no-skips": {
            id: "38dm2gz8",
            val: "q5v9wxvl"
          },
          jakxextVersionVariable
        }
      },
    }
  },
  "daxter": {
    id: "n26847dp",
    categories: {
      "any": {
        id: "rklxpwkn",
        subcategories: {}
      },
      "no-tms": {
        id: "vdo5zqyk",
        subcategories: {}
      },
      "all-missions": {
        id: "9kvxmj2g",
        subcategories: {}
      },
      "101": {
        id: "ndxjgj2q",
        subcategories: {}
      },
    }
  },
  "daxterext": {
    id: "4d7ng7r6",
    categories: {
      "all-masks": {
        id: "rklm13rd",
        subcategories: {}
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
      "max-no-hero-mode": {
        id: "jdrqz0k6",
        subcategories: {}
      },
      "hero-mode-any": {
        id: "xk9eyjy2",
        subcategories: {}
      },
      "101": {
        id: "z279ood0",
        subcategories: {}
      },
      "hero-mode-no-sps": {
        id: "xk99ngk0",
        subcategories: {}
      }
    }
  },
  "trifecta": {
    id: "n268l71p",
    categories: {
      "any": {
        id: "5dwp5nkg",
        subcategories: {}
      },
      "100": {
        id: "wk6j7rd1",
        subcategories: {}
      },
      "any-debug": {
        id: "xd1ezxr2",
        subcategories: {}
      }
    }
  },
}
