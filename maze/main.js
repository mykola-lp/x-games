/**
 * Represents a maze for the player to navigate.
 * 
 * The `Maze` class models a rectangular maze grid with passages and walls. It includes
 * methods for setting up the maze, moving a player within the maze, handling user input,
 * and displaying the current state of the maze.
 */
class Maze {

  /**
   * Constructor for the Maze class.
   * 
   * This constructor initializes a new instance of the Maze class with the specified
   * dimensions and maze layout.
   * 
   * It sets the initial position of the player and the initial direction of movement.
   * 
   * @param {number}     width    - The width of the maze (number of columns).
   * @param {number}     height   - The height of the maze (number of rows).
   * @param {number[][]} mazeData - A two-dimensional array representing the maze.
   *                                Values of 1 represent walls, and 0 represents passages.
   */
  constructor(width, height, mazeData) {
    this.width = width;           // The width of the maze.
    this.height = height;         // The height of the maze.
    this.mazeData = mazeData;     // The maze data as a two-dimensional array.
    this.playerX = 0;             // Initial X coordinate of the player.
    this.playerY = 0;             // Initial Y coordinate of the player.
    this.direction = 0;           // The current direction of the player's movement: 
                                  //   0: up,
                                  //   1: right,
                                  //   2: down,
                                  //   3: left.
  }

  /**
   * Find the starting position in the maze.
   * 
   * This method searches the first row (row 0) of the maze to find a cell that is
   * a passage (represented by 0).
   * 
   * Once a passage is found, it sets the player's starting position to this cell's
   * X coordinate and the top row (Y coordinate = 0).
   * 
   * It then exits the loop immediately after finding the starting position to avoid
   * further unnecessary checks.
   */
  findStart() {
    // Iterate through each column in the first row of the maze
    for (let x = 0; x < this.width; x++) {
      // Check if the cell at the current column in the first row is a passage (0)
      if (this.mazeData[0][x] === 0) {
        // Set the player's X position to the column of the passage
        this.playerX = x;

        // Set the player's Y position to 0 (the top row)
        this.playerY = 0;

        // Exit the loop as the starting position has been found
        break;
      }
    }
  }

  /**
   * Check if there is a wall in the given direction.
   * 
   * This method calculates the potential new position of the player based on the
   * current position and the direction specified by the change in X (dx) and Y (dy).
   * 
   * It first checks if this new position is outside the maze boundaries. If so,
   * it returns true, indicating that there is a wall (or boundary) outside the maze.
   * 
   * If the new position is within the maze boundaries, it checks the maze data at that
   * position to determine if there is a wall (represented by 1). It returns true if
   * there is a wall and false otherwise.
   * 
   * @param {number} dx - The change in the X coordinate based on the direction.
   * @param {number} dy - The change in the Y coordinate based on the direction.
   * 
   * @returns {boolean} - Returns true if there is a wall in the given direction,
   *                      false otherwise.
   */
  isWall(dx, dy) {
    // Calculate the new position based on the current player
    // position and direction.
    const newX = this.playerX + dx;
    const newY = this.playerY + dy;
  
    // Check if the new position is outside the maze boundaries
    if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) {
      // There is a wall outside the maze boundaries.
      return true;
    }
  
    // Check if the new position contains a wall (1) or a passage (0)
    return this.mazeData[newY][newX] === 1;
  }
  
  /**
   * Move the player in the current direction.
   * 
   * This method updates the player's position based on the current direction of movement.
   * The direction determines how the player's X and Y coordinates change.
   * 
   * It first calculates the change in coordinates (dx and dy) based on the direction.
   * Then, it checks if moving to the new position would result in hitting a wall using
   * the `isWall` method.
   * 
   * If the new position is not a wall, it updates the player's position. If there is a wall,
   * the player changes direction to the right (clockwise) by incrementing the direction and
   * using modulo arithmetic to wrap around.
   */
  move() {
    let dx = 0;
    let dy = 0;

    // Determine the change in x and y coordinates based on
    // the current direction.
    switch (this.direction) {
      case 0:
        dy = -1; // Move up.
        break;
      case 1:
        dx = 1;  // Move right.
        break;
      case 2:
        dy = 1;  // Move down.
        break;
      case 3:
        dx = -1; // Move left.
        break;
    }

    // Check if the new position is not a wall. If so, update
    // the player's position.
    if (!this.isWall(dx, dy)) {
      this.playerX += dx;
      this.playerY += dy;
    } else {
      // If there is a wall in the direction, turn the player
      // right (clockwise).
      this.direction = (this.direction + 1) % 4;
    }
  }

  /**
   * Print the maze to the page.
   * 
   * This method generates a string representation of the maze and updates the HTML
   * element with the ID 'mazeContainer' to display the maze.
   * 
   * It creates a visual representation of the maze where the player's position is
   * marked with 'X', walls are represented by '▒', and passages are represented by ' '.
   * 
   * @param {Maze} maze - The Maze instance containing the maze data and player state.
   */
  printMaze() {
    // Generate a string representation of the maze.
    const displayMaze = maze.mazeData.map((row, y) => 
      row.map((cell, x) => 
        // Place 'X' where the player is located, '▒' for walls, and ' ' for passages.
        (maze.playerX === x && maze.playerY === y) ? 'X' : (cell === 1 ? '▒' : ' ')
      ).join('')
    ).join('\n');

    // Get the HTML element where the maze will be displayed.
    const mazeContainer = document.getElementById('mazeContainer');
    
    // Set the content of the mazeContainer element to the maze string.
    mazeContainer.textContent = displayMaze;
  }

  /**
   * Handle keypress events to control the player's movement.
   * 
   * This method listens for keypress events and updates the player's movement direction
   * based on the arrow key that is pressed.
   * 
   * The direction is set as follows:
   * 
   * - 'ArrowUp':    Sets the direction to 0, which corresponds to moving up.
   * - 'ArrowRight': Sets the direction to 1, which corresponds to moving right.
   * - 'ArrowDown':  Sets the direction to 2, which corresponds to moving down.
   * - 'ArrowLeft':  Sets the direction to 3, which corresponds to moving left.
   * 
   * The direction value is used by the `move` method to determine how the player should
   * be moved in the maze.
   * 
   * @param {KeyboardEvent} event - The keyboard event representing the key press.
   */
  handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.direction = 0; // Up.
        break;
      case 'ArrowRight':
        this.direction = 1; // Right.
        break;
      case 'ArrowDown':
        this.direction = 2; // Down.
        break;
      case 'ArrowLeft':
        this.direction = 3; // Left.
        break;
    }
  }

  /**
   * Set up an event listener for keypresses and update the maze display.
   * 
   * This method adds an event listener to the document that listens for 'keydown' events.
   * When a key is pressed, it performs the following actions:
   * 
   * 1. Calls the `handleKeyPress` method to update the player's movement direction based on
   *    the key pressed.
   * 2. Calls the `move` method to update the player's position in the maze based on the
   *    newly set direction.
   * 3. Calls the `printMaze` method to refresh the maze display, showing the updated position
   *    of the player.
   * 
   * The method ensures that every time a key is pressed, the maze is updated to reflect any
   * changes in the player's position and direction.
   */
  setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      // Handle the key press event.
      this.handleKeyPress(event);

      // Move the player based on the updated direction.
      this.move();

      // Print the maze after handling movement.
      this.printMaze();
    });
  }

}

// Example usage
const mazeData = [
  [1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 1],
];

const maze = new Maze(7, 7, mazeData);

// Set the player's starting position.
maze.findStart();

// Print the initial maze.
maze.printMaze();

// Set up event listeners for keypresses.
maze.setupEventListeners();
