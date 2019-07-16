document.addEventListener('DOMContentLoaded', () => {

  //variables - some could be global ========================================
  const squares = []
  const width = 10
  const grid = document.querySelector('.grid')
  let turretCurrentIndex = null
  const scoreBoard = document.querySelector('.score')
  let score = 0

  // create grid ============================================================
  for(let i = 0; i < width * width; i++) {
    //sets variable square to create the element div
    const square = document.createElement('div')
    //pushes the div to the array squares
    squares.push(square)
    //appends the div to the main html class grid
    grid.appendChild(square)
  }

  turretCurrentIndex = squares.length-1


  // add turret==============================================================

  squares[squares.length-1].classList.add('turret')

  //move turret =============================================================

  function moveTurret(e) {

    squares[turretCurrentIndex].classList.remove('turret')

    switch(e.keyCode) {
      case 37:
        if(turretCurrentIndex % width !== 0) turretCurrentIndex -= 1
        break

      case 39:
        if(turretCurrentIndex % width < width - 1) turretCurrentIndex += 1
        break
    }
    squares[turretCurrentIndex].classList.add('turret')
  }

  //add invaders=================================================
  const invadersPosition = [
    2,3,4,5,6,7,
    12,13,14,15,16,17

  ]

  //setting direction of invaders

  let direction = 0
  let rightCounter = 0
  let leftCounter = 0

  let moveRight = 1
  let down = width
  let moveLeft = -1


  function invaders() {

    for (let i = 0; i <= invadersPosition.length - 1; i++) {
      squares[invadersPosition[i]].classList.remove('invader')
    }

    for (let i = 0; i <= invadersPosition.length - 1; i++) {
      invadersPosition[i] += direction

    }

    for (let i = 0; i <= invadersPosition.length - 1; i++) {
      squares[invadersPosition[i]].classList.add('invader')
    }

    //

    if(rightCounter < 2){
      direction = moveRight
      rightCounter++

    }else if (rightCounter === 2) {
      direction = down
      rightCounter = 3
    //
    }else if (leftCounter < 4) {
      direction = moveLeft
      leftCounter ++
    }else if (leftCounter === 4){
      direction = down
      leftCounter = 3
      rightCounter = 0
    }
  }

  //need to stop at some point
  const invaderId = setInterval(invaders, 500)

  if(squares[turretCurrentIndex].classList.contains('invader', 'turret')) {
    clearInterval(invaderId)
  }

//FIRE MISSILE AND COLLISION
  function fireMissile(e) {
    let missileId = null
    let missileCurrentIndex = turretCurrentIndex
    function moveMissile() {

      squares[missileCurrentIndex].classList.remove('missile')
      squares[missileCurrentIndex-=width].classList.add('missile')

      if(squares[missileCurrentIndex].classList.contains('invader')) {
        squares[missileCurrentIndex].classList.remove('invader', 'missile')

        clearInterval(missileId)

        const hit = invadersPosition.indexOf(missileCurrentIndex)

        invadersPosition.splice(hit,1)
        console.log(invadersPosition)

        score++
        scoreBoard.textContent = score
      }

      if(missileCurrentIndex < width) {
        clearInterval(missileId)
        squares[missileCurrentIndex].classList.remove('missile')
      }

    }
    switch(e.keyCode) {
      case 32:
        missileId = setInterval(moveMissile, 100)
        break
    }
  }

  // // fire bombs
  // let bombId = null
  //
  // function fireBomb() {
  //
  //   const randomIndex = Math.floor(Math.random() * invadersPosition.length)
  //
  //   let bomberIndex = invadersPosition[randomIndex]
  //
  //
  //   function moveBomb() {
  //
  //     squares[bomberIndex].classList.remove('bomb')
  //     squares[bomberIndex+=width].classList.add('bomb')
  //
  //     if(squares[bomberIndex].classList.contains('turret')) {
  //       squares[bomberIndex].classList.remove('bomb', 'turret')
  //
  //       clearInterval(bombId)
  //
  //     }
  //     if(bomberIndex < width) {
  //       clearInterval(bombId)
  //       squares[bomberIndex].classList.remove('bomb')
  //     }
  //
  //   }
  //   bombId = setInterval(moveBomb, 100)
//   // }
//
// const fireBombId = setInterval(fireBomb, 1000)
  //event listeners=============================================================

  document.addEventListener('keyup', fireMissile)
  document.addEventListener('keydown', moveTurret)

})
