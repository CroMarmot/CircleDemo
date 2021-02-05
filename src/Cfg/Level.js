export const Level = [
    {color: `#0000ff`},
    {color: `#00ff00`},
    {color: `#00ffff`},
    {color: `#ff0000`},
    {color: `#ff00ff`},
    {color: `#ffff00`},
    {color: `#ffffff`},
    {color: `#00007f`},
    {color: `#007f00`},
    {color: `#007f7f`},
    {color: `#7f0000`},
    {color: `#7f007f`},
    {color: `#7f7f00`},
    {color: `#7f7f7f`},
    {color: `#000000`},
].map((item, index) => ({
    lvl: index,
    radius: (index + 1) * 10,
    score: (index+1)*3,
    color: item.color
}));
