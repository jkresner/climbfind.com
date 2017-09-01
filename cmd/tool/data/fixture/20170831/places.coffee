module.exports =


  import:
    areas: [
      { tz: "America/Los_Angeles", name: "San Francisco Bay Area", short: "SF Bay Area", refine: "&location=37.650481,-122.287186&radius=49000" }
      { tz: "Europe/Dublin", name: "Dublin, Ireland", short: "Dublin" }
    ]
    linked: [
      { name: "Toronto Rock Oasis", tz: "America/Toronto", linked: ["597e2008dda0727873a576ff"] }
      { name: "Ajax Rock Oasis", tz: "America/Toronto", linked: ["597e2008dda0727873a576ff"] }
    ]


  reassign_to:
    pgsunnyvale:
      posts:      ["59a07c19031b5f000442afaa"]
      subs:       ["59a07c19031b5f000442afac"]


  approve:

    alienblock:
      _id:        "597e2073dba1187878dcbb34"
      climbing:   ['boulder']
      name:       "alien block"
      shortName:  "alien block"
      imgur:      logo: "tDQg1kd", avatar: "5U2i9E3"

    boulderz:
      _id:        "597e2073dba1187878dcbb74"
      climbing:   ['tr','boulder','lead']
      name:       "Boulderz Climbing Centre"
      shortName:  "Boulderz"
      imgur:      logo: "PfdJmoK", avatar: "aJDoMv1"

    pgbelmont:
      _id:        "59a9099614e322081879d91d"
      climbing:   ['tr','boulder','lead']
      name:       "Planet Granite Belmont"
      shortName:  "PG Belmont"
      imgur:      logo: "lSZ0VfZ", avatar: "wekqCol"

    pgsunnyvale:
      _id:        "59a9099614e322081879d91f"
      climbing:   ['tr','boulder','lead']
      name:       "Planet Granite Sunnyvale"
      shortName:  "PG Sunnyvale"
      imgur:      logo: "lSZ0VfZ", avatar: "wekqCol"

    awsm_dublin:
      _id:        "59a9099514e322081879d8fe"
      climbing:   ['tr','boulder','lead']
      name:       "Awesome Walls Dublin"
      shortName:  "Awesome Walls Dublin"
      imgur:      logo: "rRGhbUb", avatar: "QfARc6H"

    gravity:
      _id:        "59a9099514e322081879d8fa"
      climbing:   ['tr','boulder','lead']
      name:       "Gravity Climbing Centre"
      shortName:  "Gravity Dublin"
      imgur:      logo: "8orbO72", avatar: "Og50jSR"

    oasisajax:
      _id:        "59a9099714e322081879d922"
      climbing:   ['tr','boulder','lead']
      name:       "The Ajax Rock Oasis"
      shortName:  "Ajax Rock Oasis"
      imgur:      logo: "0fCRviQ", avatar: "yeSnePE"

    oasistoronto:
      _id:        "59a9099714e322081879d924"
      climbing:   ['tr','boulder','lead']
      name:       "The Toronto Rock Oasis"
      shortName:  "Toronto Rock Oasis"
      imgur:      logo: "0fCRviQ", avatar: "1dlqDm5"
