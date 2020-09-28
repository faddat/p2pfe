import { createApp } from "vue";
import App from "./App.vue";
import IPFS from "ipfs";
import Blurt from "@ericet/blurtjs"


createApp(App).mount("#app");


async function main () {
	//Create IPFS node in browser, can acces "node.*"
	const node = await IPFS.create({
		libp2p: {
			config: {
				dht: {
					enabled: true,
					clientMode: true
				}
			}
		}
	})

	//Get IPFS-js version
	const version = await node.version()
	//Connect to important IFPS nodes

	const fileAdded = await node.add({
		path: 'hello.txt',
		content: 'Hello World 101'
	})

	Blurt.api.setOptions({ url: 'https://rpc.blurt.world' ,useAppbaseApi: true})

	Blurt.api.getAccounts(['megadrive', 'jacobgadikian'], function(err, result) {
		console.log(err, result);
	});

	console.log(node.dht.findPeer("12D3KooWGxK9wz7EG7nbU7WwJXGSnstDgdYkeRs9nhef4WULiCfi"))
	await node.swarm.connect("/ip4/ipfs.blurt.world/tcp/4002/ws/p2p/12D3KooWGxK9wz7EG7nbU7WwJXGSnstDgdYkeRs9nhef4WULiCfi")

	//Print IFPS-js version
	console.log('Version:', version.version)
	//Get Peers every second as a debug measure for now


	console.log('Added file:', fileAdded.path, fileAdded.cid)


	const chunks = []
	for await (const chunk of node.cat(fileAdded.cid)) {
		chunks.push(chunk)
	}


	console.log('Added file contents:', (chunks).toString())



}

main()




