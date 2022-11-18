const { Console } = require("@woowacourse/mission-utils");
const OutputView = require("./OutputView");
const { STRUCTURE, MESSAGE } = require("./constant/message.js");

/**
 * 다리 건너기 게임을 관리하는 클래스
 */

class BridgeGame {
    bridgeArray;
    bridgeCount;
    #gameCount;
    #upBridgeHistory;
    #downBridgeHistory;

    constructor(bridgeArray) {
        this.bridgeArray = bridgeArray;
        this.bridgeCount = 0;
        this.#gameCount = 1;
        this.#upBridgeHistory = [];
        this.#downBridgeHistory = [];
    }

    isBadMove(move) {
        console.log("BridgeGame.isBadMove----------");
        const badUp = move === "U" && this.bridgeArray[this.bridgeCount] === "D";
        const badDown = move === "D" && this.bridgeArray[this.bridgeCount] === "U";
        if (badUp || badDown) {
            console.log("true반환함");
            return true;
        }
    }

    fail(move) {
        console.log("BridgeGame.fail--------------");
        if (move === "U") {
            this.#upBridgeHistory.push(STRUCTURE.BAD);
            this.#downBridgeHistory.push(STRUCTURE.BLANK);
        }
        if (move === "D") {
            this.#upBridgeHistory.push(STRUCTURE.BLANK);
            this.#downBridgeHistory.push(STRUCTURE.BAD);
        }
        OutputView.printMap(this.#upBridgeHistory, this.#downBridgeHistory);
    }

    move(move) {
        console.log("BridgeGame.move-----------");
        const rightUp = move === "U" && this.bridgeArray[this.bridgeCount] === "U";

        this.rightMove(rightUp);
    }

    isSuccess(move) {
        console.log("BridgeGame.isSuccess---------------------");
        const rightUp = move === "U" && this.bridgeArray[this.bridgeCount] === "U";
        console.log(this.bridgeArray[this.bridgeCount], move);
        if (this.bridgeCount === this.bridgeArray.length - 1) {
            if (rightUp) {
                this.#upBridgeHistory.push(STRUCTURE.GOOD);
                this.#downBridgeHistory.push(STRUCTURE.BLANK);
            }
            if (!rightUp) {
                this.#upBridgeHistory.push(STRUCTURE.BLANK);
                this.#downBridgeHistory.push(STRUCTURE.GOOD);
            }
            return true;
        }
    }

    rightMove(rightUp) {
        if (rightUp) {
            this.#upBridgeHistory.push(STRUCTURE.GOOD);
            this.#downBridgeHistory.push(STRUCTURE.BLANK);
        }
        if (!rightUp) {
            this.#upBridgeHistory.push(STRUCTURE.BLANK);
            this.#downBridgeHistory.push(STRUCTURE.GOOD);
        }
        OutputView.printMap(this.#upBridgeHistory, this.#downBridgeHistory, this.bridgeArray);
        this.bridgeCount++;
    }

    retry(answer) {
        if (answer === "R") {
            this.bridgeCount = 0;
            this.#upBridgeHistory = [];
            this.#downBridgeHistory = [];
            this.#gameCount++;
            return true;
        }
    }

    success() {
        console.log(MESSAGE.FINISH);
        OutputView.printMap(this.#upBridgeHistory, this.#downBridgeHistory);
        console.log(MESSAGE.SUCCESS);
        console.log(MESSAGE.TRY + this.#gameCount);
        Console.close();
    }

    finish() {
        console.log(MESSAGE.FINISH);
        OutputView.printMap(this.#upBridgeHistory, this.#downBridgeHistory);
        console.log(MESSAGE.FAIL);
        console.log(MESSAGE.TRY + this.#gameCount);
        Console.close();
    }
}
module.exports = BridgeGame;
