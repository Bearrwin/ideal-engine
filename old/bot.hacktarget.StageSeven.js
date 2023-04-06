/** @param {NS} ns */
export async function main(ns) {


	// ns.disableLog("sleep")
	// ns.disableLog("getHackingLevel")
	// ns.disableLog("getServerMoneyAvailable")
	// ns.disableLog("getServerRequiredHackingLevel")
	// ns.disableLog("getServerMaxRam")
	ns.tail()


	var stageOne = ns.read("/savedVar/stageOne.txt") === "true" ? true : false;
	var newTarget = ns.read("/savedVar/newTarget.txt") === "true" ? true : false;
	var servCount = ns.read("/savedVar/purchServCount.txt")
	var phaseOneDone = false
	var phaseTwoDone = false
	var phaseThreeDone = false
	var phaseFourDone = false
	var phaseFiveDone = false
	var phaseSixDone = false
	var phaseSevenDone = false
	var phaseEightDone = false
	var phaseNineDone = false
	var phaseTenDone = false
	var phaseElevenDone = false
	var phaseTwelveDone = false

	var currentTarget = "max-hardware"
	let firstTarget = "max-hardware"
	let secondTarget = "phantasy"
	let thirdTarget = "the-hub"
	let fourthTarget = "catalyst"
	let fifthTarget = "clarkinc"
	let sixthTarget = "ecorp"
	let seventhTarget = "megacorp"
	let wThreads = 1
	let gThreads = 12
	let hThreads = 1
	let cycleDelay = 1000
	let targetChange = false
	let doubleBarrel = false
	let doubleBarrelTarget = "n00dles"
	var pidOne = 0
	var pidTwo = 0

	while (ns.getHackingLevel() < 100) {
		await ns.sleep(1000)
	}
	ns.run("/worm/worm.nuke.js")
	ns.tprint("Running Nuke worm to crack all possible ports and nuke all possible servers.")
	ns.tprint("")
	await ns.sleep(10000)

	while (true) {
		ns.run("/utils/isexists.purchServ.js")
		await ns.sleep(1000)
		servCount = ns.read("/savedVar/purchServCount.txt")
		if (servCount > 0) {
			var servRam = ns.getServerMaxRam("S")
		}

		if (servCount <= 3 && phaseOneDone == false) {
			wThreads = 10
			gThreads = 120
			hThreads = 10
			cycleDelay = 500
			currentTarget = firstTarget
			targetChange = true
			phaseOneDone = true
		}
		await ns.sleep(100)
		if (ns.getHackingLevel() > 200 && phaseTwoDone == false && ns.hasRootAccess(secondTarget)) {
			wThreads = 10
			gThreads = 120
			hThreads = 10
			cycleDelay = 100
			currentTarget = secondTarget
			targetChange = true
			phaseTwoDone = true
		}
		await ns.sleep(100)
		if (servCount >= 3 && servRam >= 1024 && phaseThreeDone == false && ns.hasRootAccess(thirdTarget)) {
			wThreads = 15
			gThreads = 30
			hThreads = 15
			cycleDelay = 100
			currentTarget = thirdTarget
			targetChange = true
			phaseThreeDone = true
		}
		await ns.sleep(100)
		if (servCount >= 3 && servRam >= 16384 && phaseFourDone == false) {
			wThreads = 30
			gThreads = 60
			hThreads = 30
			cycleDelay = 100
			currentTarget = thirdTarget
			targetChange = true
			phaseFourDone = true
		}
		await ns.sleep(100)
		if (servCount >= 3 && servRam >= 65536 && phaseFiveDone == false) {
			wThreads = 60
			gThreads = 180
			hThreads = 60
			cycleDelay = 50
			currentTarget = thirdTarget
			targetChange = true
			phaseFiveDone = true
		}
		await ns.sleep(100)
		if (ns.getHackingLevel() < 2000 && servCount >= 3 && servRam >= 262144 && phaseSixDone == false) {
			wThreads = 150
			gThreads = 450
			hThreads = 150
			cycleDelay = 50
			currentTarget = thirdTarget
			targetChange = true
			phaseSixDone = true
		}
		await ns.sleep(100)
		if (ns.getHackingLevel() < 2000 &&servCount >= 10 && servRam >= 262144 && phaseSevenDone == false) {
			wThreads = 100
			gThreads = 300
			hThreads = 100
			cycleDelay = 50
			currentTarget = fourthTarget
			targetChange = true
			phaseSevenDone = true
		}
		await ns.sleep(100)
		if (ns.getHackingLevel() < 2000 && servCount >= 15 && servRam >= 262144 && phaseEightDone == false) {
			wThreads = 150
			gThreads = 1000
			hThreads = 150
			cycleDelay = 50
			currentTarget = fourthTarget
			targetChange = true
			phaseEightDone = true
		}
		await ns.sleep(100)
		if (ns.getHackingLevel() > 2000 && ns.hasRootAccess(fifthTarget) && phaseNineDone == false) {
			wThreads = 150
			gThreads = 1000
			hThreads = 150
			cycleDelay = 50
			currentTarget = fifthTarget
			targetChange = true
			phaseNineDone = true
		}

		await ns.sleep(100)
		if (ns.getHackingLevel() > 4000 && ns.hasRootAccess(sixthTarget) && phaseTenDone == false) {
			wThreads = 300
			gThreads = 3000
			hThreads = 100
			cycleDelay = 25
			currentTarget = sixthTarget
			targetChange = true
			phaseTenDone = true
		}
		await ns.sleep(100)


		if (ns.getHackingLevel() > 4000 && ns.hasRootAccess(seventhTarget) && phaseElevenDone == false) {
			wThreads = 300
			gThreads = 3000
			hThreads = 100
			cycleDelay = 25
			doubleBarrelTarget = seventhTarget
			doubleBarrel = true
			targetChange = true
			phaseElevenDone = true
		}



		if (targetChange == true) {
			ns.run("/worm/worm.nuke.js")
			ns.tprint("Running Nuke worm to crack all possible ports and nuke all possible servers.")
			ns.tprint("")

			ns.run("/serv/serv.propagate.all.js")
			await ns.sleep(5000)
			ns.tprint("PID to kill is " + pidOne)
			ns.kill(pidOne)
			await ns.sleep(10000)
			var pidOne = ns.run("/init/init.batcher.pservPool.js", 1, currentTarget, wThreads, gThreads, hThreads, cycleDelay)
			if (doubleBarrel == true) {
				ns.tprint("PID2 to kill is " + pidTwo)
				ns.kill(pidTwo)
				var pidTwo = ns.run("/init/init.batcher.pservPool.js", 1, doubleBarrelTarget, wThreads, gThreads, hThreads, cycleDelay)

			}
		}
		targetChange = false


		let timeOut = 100
		while (newTarget == false) {

			newTarget = ns.read("/savedVar/newTarget.txt") === "true" ? true : false;
			await ns.sleep(6000)
			timeOut--
			ns.print(timeOut)
			if (timeOut < 1) {
				newTarget = true
			}


		}
		ns.run("/worm/worm.nuke.js")
		ns.tprint("Running Nuke worm to crack all possible ports and nuke all possible servers.")
		ns.tprint("")

		ns.run("/serv/serv.propagate.all.js")
		await ns.sleep(5000)
		ns.tprint("We have a new targeting request")
		ns.write("/savedVar/newTarget.txt", "false", "w")
		await ns.sleep(1000)
		newTarget = ns.read("/savedVar/newTarget.txt") === "true" ? true : false;

		await ns.sleep(10)
	}

}