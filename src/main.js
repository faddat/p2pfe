import { createApp } from "vue";
import App from "./App.vue";
import IPFS from "ipfs";
createApp(App).mount("#app");


async function main () {
	const node = await IPFS.create()
	const version = await node.version()

	console.log('Version:', version.version)

	const fileAdded = await node.add({
		path: 'hello.txt',
		content: 'Hello World 101'
	})

	console.log('Added file:', fileAdded.path, fileAdded.cid)

	const chunks = []
	for await (const chunk of node.cat(fileAdded.cid)) {
		chunks.push(chunk)
	}

	console.log('Added file contents:', (chunks).toString())
}

main()




