input.onButtonPressed(Button.A, function () {
    ALT += -1
    if (ALT < 0) {
        ALT = 0
    }
})
input.onButtonPressed(Button.AB, function () {
    for (let zap = 0; zap <= 4; zap++) {
        led.plot(zap, ALT)
        landscape[zap] = ALT - 1
    }
    music.playTone(988, music.beat(BeatFraction.Eighth))
})
input.onButtonPressed(Button.B, function () {
    ALT += 1
    if (ALT > 4) {
        ALT = 4
    }
})
input.onGesture(Gesture.Shake, function () {
    pause2 = 1
    basic.showIcon(IconNames.Heart)
    basic.showString(convertToText(lives))
    basic.pause(1000)
    basic.showIcon(IconNames.Target)
    basic.showString(convertToText(points))
    basic.pause(1000)
    pause2 = 0
})
let shifted = 0
let height = 0
let pause2 = 0
let ALT = 0
let landscape: number[] = []
let points = 0
let lives = 0
images.createBigImage(`
    . . . . # . . . . .
    . . . # . . . . . .
    . # # # # # # . . .
    . . . # . . . . . .
    . . . . # . . . . .
    `).scrollImage(1, 200)
lives = 5
points = 0
landscape = []
ALT = 0
for (let index = 0; index < 100; index++) {
    landscape.unshift(randint(0, 3))
    if (80 < randint(0, 100)) {
        landscape[0] = landscape[0] * -1
    }
}
pause2 = 0
basic.forever(function () {
    if (pause2 == 0) {
        points += 1
        led.plotBrightness(0, ALT, 255)
        basic.pause(300)
        for (let index = 0; index <= 4; index++) {
            height = Math.abs(landscape[index])
            for (let index2 = 0; index2 <= 4; index2++) {
                if (index2 <= height) {
                    if (0 > landscape[index]) {
                        led.plotBrightness(index, 4 - index2, 200)
                    } else {
                        led.plotBrightness(index, 4 - index2, 50)
                    }
                    if (index == 0 && ALT == 4 - index2) {
                        if (200 == led.pointBrightness(index, 4 - index2)) {
                            points += 50
                            lives += 1
                            basic.showIcon(IconNames.Heart)
                        } else {
                            lives += -1
                        }
                    }
                } else {
                    led.plotBrightness(index, 4 - index2, 0)
                }
            }
        }
        shifted = landscape.shift()
        if (80 < randint(0, 100)) {
            landscape.push(randint(-3, 0))
        } else {
            landscape.push(randint(0, 3))
        }
        if (lives <= 0) {
            game.setScore(points)
            basic.showIcon(IconNames.Sad)
            game.gameOver()
        }
    }
})
