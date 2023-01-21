const csv = require("csv-parser")
const fs = require("fs")
const CANADA = "canada.txt"
const USA = "usa.txt"

fs.unlink(`./${CANADA}`, err => {
	if (err) {
		if (err.errno === -4058) {
			console.log("No file found")
			return
		}
	} else {
		console.log(`Successfully removed ${CANADA}`)
		return
	}
})

fs.unlink(`./${USA}`, err => {
	if (err) {
		if (err.errno === -4058) {
			console.log("No file found")
			return
		}
	} else {
		console.log(`Successfully removed ${USA}`)
		return
	}
})
fs.writeFile(`./${CANADA}`, "country, year, population\n", err => {
	if (err) {
		console.log(err)
	}
})

fs.writeFile(`./${USA}`, "country, year, population\n", err => {
	if (err) {
		console.log(err)
	}
})

fs.createReadStream("./input_countries.csv")
	.pipe(csv())
	.on("data", row => {
		if (row.country === "Canada") {
			const canada = `${row.country}, ${row.year}, ${row.population}\n`
			fs.appendFile("canada.txt", canada, err => {
				if (err) {
					console.log(err)
					return
				}
			})
		} else if (row.country === "United States") {
			const usa = `${row.country}, ${row.year}, ${row.population}\n`
			fs.appendFile("usa.txt", usa, err => {
				if (err) {
					console.log(err)
					return
				}
			})
		}
	})
	.on("end", () => {
		console.log("Canada records have been filtered")
		console.log("USA records have been filtered")
	})
