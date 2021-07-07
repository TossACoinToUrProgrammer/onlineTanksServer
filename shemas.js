const schemas = [
  {
    playerPositions: [
      {
        x: 300,
        y: 300,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 400,
        y: 400,
      }
    ],
    walls: [
      { type: "horizontal", startX: 140, endX: 420, startY: 100, endY: 135 },
      { type: "vertical", startX: 100, endX: 135, startY: 200, endY: 305 },
      { type: "vertical", startX: 340, endX: 375, startY: 135, endY: 450 },
    ],
    bgImage:
      "data:image/jpeg;base64,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",
    wallImage: "https://lh3.googleusercontent.com/_seoZMCjPGus0YWB7WRqCI9xNCGQ97wyCG5JZOPWnTvkz5taKtyhWL4Bj_4Xpw5U-dPi=s64",
  },
  {
    playerPositions: [
      {
        x: 300,
        y: 300,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 400,
        y: 400,
      }
    ],
    walls: [
      { type: "horizontal", startX: 0, endX: 350, startY: 100, endY: 135 },
      { type: "vertical", startX: 100, endX: 135, startY: 135, endY: 380 },
      { type: "horizontal", startX: 135, endX: 345, startY: 345, endY: 380 },
      { type: "vertical", startX: 490, endX: 525, startY: 420, endY: 525 },
    ],
    bgImage:
      "https://besthqwallpapers.com/Uploads/1-9-2019/103790/thumb-stone-wall-texture-cartoon-wall-background-purple-stone-background-stone-texture.jpg",
    wallImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ucomvND7Sc_2y37sn4VORAeGq78YZuOVEMd8HrDxMyfZSoYll5g-QUddaKZGcxbz7eU&usqp=CAU",
  },
]

module.exports = schemas