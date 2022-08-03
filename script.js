var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
   SudokuSolver(board, 0, 0, 9);
};

function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false;
        }
    }
    return true;
}

function SudokuSolver(board, i, j, n) {
	for (let x = i; x < n; x++) {
    for (let y = j; y < n; y++) {
      if (board[x][y] == 0) {
        for (let k = 1; k <= n; k++) {
          if (isValid(board, x, y, k)) {
            board[x][y] = k;
          if (SudokuSolver(board,i,j,n)) {
           return true;
          } else {
            board[x][y] = 0;
          }
         }
       }
       return false;
     }
   }
 }
 FillBoard(board);
 return true;
}










//   bool isValid(vector<vector<char>> &board,int row,int col,char c)
//     {
//         for(int i=0;i<9;i++)
//         {
//             if(board[row][i]==c)
//                 return false;
//             if(board[i][col]==c)
//                 return false;
//             if(board[3 * (row / 3) + i / 3][ 3 * (col / 3) + i % 3]==c)
//                 return false;
//         }
//         return true;
//     }
   
//      bool solve(vector<vector<char>> &board)
//     {
//         for(int i=0;i<board.size();i++)
//         {
//             for(int j=0;j<board[0].size();j++)
//             {
//                 if(board[i][j]=='.')
//                 {
//                     for(char c='1';c<='9';c++)
//                     {
//                         if(isValid(board,i,j,c))
//                         {
//                             board[i][j]=c;
                            
//                             if(solve(board)==true)
//                                 return true;
//                             else
//                                 board[i][j]='.';
//                         }
//                     }
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
  
    // void solveSudoku(vector<vector<char>>& board) {
    //     solve(board);
    // }

