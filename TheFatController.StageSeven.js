/** @param {NS} ns */
export async function main(ns) {

	ns.disableLog("getServerMoneyAvailable")
	ns.disableLog("sleep")
	ns.tail()
	ns.moveTail(60, 60)
	ns.resizeTail(500, 150)

	// Start the budget manager bot
	ns.run("/bot/bot.cfo.StageSeven.js")
	ns.tprint("I made you the CFO now get to work!")

	await ns.sleep(1000)

	// Start timer script
	ns.run("/bot/bot.timer.5mins.js")
	ns.tprint("* Fires starter pistol and shouts 'MINIONS GO!'")
	// Start bot to manage jobs and later sleeves
	ns.run("/bot/bot.minions.StageSeven.js")


	await ns.sleep(5000)



	// start script to determine best target to hack
	ns.tprint("Starting our Hacking target assessment.")
	ns.run("/bot/bot.hacktarget.StageSeven.js")
	await ns.sleep(1000)

	var stageSevenDone = false

	while (stageSevenDone == false) {
		stageSevenDone = ns.read("/savedVar/stageSevenDone.txt") === "true" ? true : false;
		await ns.sleep(60000)

	}
	ns.tprint("Sleep now!")
	await ns.sleep(2000)
	ns.singularity.installAugmentations("TheFatController.StageEight.js")








}