sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy) {
    // If this is the Mega Goggo, treat it differently
    if (enemy == megaGoggo) {
        projectile.destroy()
        megaHP += -1
        if (megaHP <= 0) {
            megaGoggo.destroy(effects.fire, 200)
            info.changeScoreBy(10)
        }
    } else {
        projectile.destroy()
        enemy.destroy(effects.spray, 100)
        killCount += 1
        info.changeScoreBy(1)
        if (killCount == 50) {
            spawnMegaGoggo()
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bullet = sprites.createProjectileFromSprite(img`
        . . 5 5 . . 
        . 5 5 5 5 . 
        . 5 5 5 5 . 
        . . 5 5 . . 
        `, player2, 100, 0)
    bullet.setKind(SpriteKind.Projectile)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemy, player3) {
    if (enemy != megaGoggo) {
        enemy.destroy()
    }
    info.changeLifeBy(-1)
})
function spawnMegaGoggo () {
    megaGoggo = sprites.create(img`
        . . a a a a a a . . 
        a a a a a a a a a a 
        a 3 a f f f a a 3 a 
        a 3 a f f f a a 3 a 
        a 3 a f f f a a 3 a 
        a a a a a a a a 3 a 
        a a a a a a a a a a 
        . . a a a a a a . . 
        `, SpriteKind.Enemy)
    megaGoggo.setVelocity(-15, 0)
    megaGoggo.setPosition(160, randint(20, 100))
    megaHP = 10
}
let goggo: Sprite = null
let bullet: Sprite = null
let killCount = 0
let megaHP = 0
let megaGoggo: Sprite = null
let player2: Sprite = null
player2 = sprites.create(img`
    . . . . . . . . 
    . . . . . . . . 
    . . 1 1 1 1 . . 
    . 1 1 1 1 1 1 . 
    . 1 f 1 1 f 1 . 
    . 1 1 1 1 1 1 . 
    . . 1 f f 1 . . 
    . . 1 f f 1 . . 
    `, SpriteKind.Player)
controller.moveSprite(player2)
player2.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    goggo = sprites.create(img`
        . . . . . . . . 
        a a a a a a a a 
        a 3 1 f 1 f 1 3 
        a 3 a a a a a 3 
        a a a a a a a a 
        1 a 1 a 1 a 1 a 
        a a a a a a a a 
        1 a 1 a 1 a a 1 
        `, SpriteKind.Enemy)
    goggo.setVelocity(-30, 0)
    goggo.setPosition(160, randint(10, 110))
})
