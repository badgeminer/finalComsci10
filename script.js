/*
    ctx: canvas context
    hp: healh points
    cntr: center
    imgs: images
*/
var c = document.getElementById("game");
ctx = c.getContext("2d");
ctx.canvas.width = window.innerWidth - 15;
ctx.canvas.height = window.innerHeight - 15;
var hp = 50
var level = 0
const cntr = (13-(13%2))/2


const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 48;
const BORDER_WIDTH = 0;
const SPACING_WIDTH = 0;

function spritePositionToImagePosition(col,row) {
    return {
        x: (
            BORDER_WIDTH +
            col * (SPACING_WIDTH + SPRITE_WIDTH)
        ),
        y: (
            BORDER_WIDTH +
            row * (SPACING_WIDTH + SPRITE_HEIGHT)
        )
    }
}

class IMG {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = spritePositionToImagePosition(x, y);
  }

  static displayName = "IMG";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
  draw(x,y) {
      ctx.drawImage(
        image,
        this.pos.x,
        this.pos.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        x,
        y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT
    );
  }
}


var image = document.getElementById('icons')


var position = spritePositionToImagePosition(7, 0);

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function teir(level) {
    if (level <= 2) {
        return "z"
    } else if (level <= 4) {
        return "y"
    } else if (level <= 6) {
        return "x"
    } else if (level <= 8) {
        return "w"
    } else if (level <= 10) {
        return "v"
    } else if (level <= 12) {
        return "u"
    } else if (level <= 14) {
        return "t"
    } else if (level <= 16) {
        return "s"
    } else if (level <= 18) {
        return "r"
    } else if (level <= 20) {
        return "q"
    } else if (level <= 22) {
        return "p"
    } else if (level <= 24) {
        return "o"
    } else if (level <= 26) {
        return "n"
    } else if (level <= 28) {
        return "m"
    } else if (level <= 30) {
        return "l"
    } else if (level <= 32) {
        return "k"
    } else if (level <= 34) {
        return "j"
    } else if (level <= 36) {
        return "i"
    } else if (level <= 38) {
        return "h"
    } else if (level <= 40) {
        return "g"
    } else if (level <= 42) {
        return "f"
    } else if (level <= 44) {
        return "e"
    } else if (level <= 46) {
        return "d"
    } else if (level <= 48) {
        return "c"
    } else if (level <= 50) {
        return "b"
    } else {
        return "a"
    }
}

var imgs = {
    hp: new IMG(9,0),
    level: new IMG(9,9),
    js: new IMG(32,0),
    enmy: new IMG(26,7),
    profitenmy: new IMG(31,8),
    corrupt: new IMG(11,6),
    malice: new IMG(11,7),
    doom: new IMG(11,8),
    crazy: new IMG(15,8),
    spider: new IMG(18,8),
    chaos: new IMG(21,32)
}

var enmyTeirs = {
    z: imgs.enmy,
    y: imgs.profitenmy,
    x: imgs.corrupt,
    w: imgs.malice,
    v: imgs.doom,
    u: imgs.crazy,
    
    t: imgs.chaos,
    s: imgs.spider,
    r: imgs.corrupt,
    q: imgs.malice,
    o: imgs.doom,
    n: imgs.crazy,
}

class Enemy {
  constructor(x, y,hp,id) {
    this.x = x;
    this.y = y;
    this.level = level+getRandomArbitrary(0,8);
    this.hp = this.level*hp;
    this.img = enmyTeirs[teir(this.level)]
    console.log(this.level,teir(this.level))
  }

  static displayName = "Enemy";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
  draw() {
      //ctx.fillStyle = `rgb(255,255,255)`;
      //ctx.fillRect(this.x * 25, this.y * 25, 25, 25);
      this.img.draw(this.x * 48, this.y * 48)
  }
}


var entitys = {}

function spawnEnemys() {
    entitys = {}
    for (let i = 0; i < 5; i++) {
        entitys[`${i}E`] = new Enemy(getRandomArbitrary(0,12),getRandomArbitrary(0,12),getRandomArbitrary(2,10),`${i}E`)
    }
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
          ctx.fillStyle = `rgb(${Math.floor(25*((i+j)%2))}, ${Math.floor(25*((i+j)%2))}, ${Math.floor(25*((i+j)%2))})`;
          if (i == cntr & j == cntr) {
              ctx.fillStyle = `rgb(255,255,255)`;
          }
          ctx.fillRect(j * 48, i * 48, 48, 48);
        }
    }
    for (e in entitys) {
        entitys[e].draw()
    }
    imgs.level.draw(0,14*48)
    ctx.fillStyle = "#ffffff";
    ctx.font = "15px Space Mono, monospace";
    ctx.fillText(`Level: ${level}`, 52, 14.5*48);
    ctx.fillText(`HP: ${hp}`, 52, 14.8*48);

    /*ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#4d004d";
    ctx.roundRect(10, 10, 200, 100, 5);
    ctx.stroke();
    ctx.fill()
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "13px Space Mono, monospace";
    ctx.fillText(`HP: ${hp}`, 30, 30);
    ctx.fillText(`Level: ${level}`, 30, 43);
    */
}
setInterval(draw,250)