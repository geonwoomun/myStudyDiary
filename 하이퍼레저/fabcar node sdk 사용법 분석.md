# 네이버 카페 하이퍼레저 연구회의 fabcar dapp 데모를 보고 혼자 분석 공부하는 글

    // Express Setup

    const express = require('express') // 익스프레스를 불러오는 것
    const app = express() // 익스프레스 실행
    var bodyParser = require('body-parser') // 바디파서 불러오는 것.
    const PORT = 3000

    
    // Hyperledger Bridge
    const { FileSystemWallet, Gateway } = require('fabric-network') // fabric-network의 리턴 값 FileSystemWallet, Gateway를 각각의 이름으로 받아오는 것 인듯. 
    const fs = require('fs')
    const path = require('path')
    const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network',    'connection.json') // connection.json을 연결하는 것.. 경로를 제대로 지정해주도록하자 .connection.json이 있는 곳을 제대로 찾아서.
    const ccpJSON = fs.readFileSync(ccpPath, 'utf8') // ccpPath를 utf8로 읽고.
    const ccp = JSON.parse(ccpJSON) // JSON.parse를 해준다. JSON 문자열의 구문을 분석하고, 그 결과에서 JS 객체를 생성.

    app.use(bodyParser.urlencoded({ extended: false })) // 바디파서 설정.

처음에는 저렇게 지정을 해주도록 하자. ccp 관련된것들을 잘 설정해주면 연결이 잘되는듯. fabcar에선 fabric node sdk 중 하나인 fabric-network를 사용했다.
그러면 모든 차들을 조회하는 부분을 한번 분석해본다.

    app.get('/api/queryallcars', async function (req, res) {  // async 함수로 만들어서 await를 쓸 수 있게 했다.

    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting

 

    // Create a new file system based wallet for managing identities.

    const walletPath = path.join(process.cwd(), 'wallet') // wallet을 연결 해주는 것. process.cwd()랑 __dirname이랑 비슷한데 process.cwd()는 코드가 실행된 장소를 말하고 __dirname은 현재 js의 위치를 말하는 것 같다. 비슷한듯...
    const wallet = new FileSystemWallet(walletPath) // 그 wallet을 FileSystemWallet으로 만드는 것 같다. 장부를 만든다?? 그런 느낌.. 
    console.log(`Wallet path: ${walletPath}`)
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists('user1')   // 장부? 에 user1이 존재하는가의 여부. 

    if (!userExists) { // 존재하지 않으면 존재하지 않는 다는 메시지들을 출력후 return

        console.log('An identity for the user "user1" does not exist in the wallet')

        console.log('Run `the registerUser.js application before retrying')

        return

        }

    // Create a new gateway for connecting to our peer node.

    const gateway = new Gateway() // 우리의 피어 노드들을 연결할 새로운 gateway를 만든다..

    await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } }) // 그 gateway를 연결한다. ccp에 wallet은 wallet이고, identity는 user1이고 , discovery enabled: false 는... 모르겠지만 일단 패스

 

    // Get the network (channel) our contract is deployed to.

    const network = await gateway.getNetwork('mychannel')  // 그 연결된 gateway에서 'mychannel'이라는 network를 가지고 온다.

 

    // Get the contract from the network.  // network로부터 chaincode를 가지고 온다. fabcar의...

    const contract = network.getContract('fabcar')

 

    // Evaluate the specified transaction.

    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')  // 쿼리카 트랜잭션이 발생..은 저런식 인자가 1개 필요
 
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')  // 모든 차를 조회하는 쿼리는 arguments가 필요없다.

    const result = await contract.evaluateTransaction('queryAllCars') // 계약 . 모든 차를 조회하는 트랜잭션 발생 결과를 result에 담음.

    console.log(`Transaction has been evaluated, result is: ${result.toString()}`)

    var obj = JSON.parse(result.toString())  // 그 결과의 toString 한것이 JSON 형식인가봄. JSON.parse를 해서 obj에 넣는다. 그러면 obj 객체, 배열이 만들어지고 그것을 사용해서 표현하면 된다.

    var tr=""

    for (var i = 0; i < obj.length; i++) {

        tr += "<tr>";
        tr+="<td>"+obj[i].Key+"</td>"
        tr+="<td>"+obj[i].Record.colour+"</td>"
        tr+="<td>"+obj[i].Record.make+"</td>"
        tr+="<td>"+obj[i].Record.model+"</td>"
        tr+="<td>"+obj[i].Record.owner+"</td>"
        tr+="</tr>"          
    }

    // console.log(tr)
    res.send(`<h1>result</h1>
    <hr/>
    <p>result is</p>
    <table style="border-collapse: collapse;" border="1">
    <thead>
    <tr><th>No</th><th>colour</th><th>make</th><th>model</th><th>owner</  th> </tr>
    </thead>
    <tbody>`+tr+
    `</tbody>
    </table>`+
    `<br><br><a href="/"><button type="button" >Main Page</button></a>`)
    })


그리고 createcar 즉 새로운 차를 만드는 코드를 분석 해보겠다.

    // Create car handle

    app.post('/api/createcar/', async function (req, res) {   // /api/createcar 주소로 정보를 보냈을 때 함수 실행.

    try {
        var carno = req.body.carno   // body에 담겨있는 정보들.
        var colour = req.body.colour
        var make = req.body.make
        var model = req.body.model
        var owner = req.body.owner

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')  // wallet이 있는 주소
        const wallet = new FileSystemWallet(walletPath)  // 그 주소로 wallet을 만든다.
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1'); // wallet 안에 user1이 존재 하는가?
        if (!userExists) { // 존재 안하면 오류를 보여줌.

            console.log('An identity for the user "user1" does not exist in the wallet')

            console.log('Run the registerUser.js application before retrying')

            return;

        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway(); // peer node에 연결 할 gateway를 만듦.
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } }); // 해당 정보로 gateway를 연결한다.

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');    // gateway의 mychannel 이라는 network를 가지고온다.
        // Get the contract from the network.
        const contract = network.getContract('fabcar'); // 거기에 fabcar라는 contract를 가져온다.

        // Submit the specified transaction.    // 5개의 인자를 받아야 한다.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        // await contract.submitTransaction('createCar', 'CAR11', 'Hnda', 'Aord', 'Bla', 'Tom')

        console.log(carno, make, model, colour, owner)
        await contract.submitTransaction('createCar', carno, make, model, colour, owner) // fabcar contract에 transaction을 제출. 'createcar'고 나머지 인자들.
        console.log('Transaction has been submitted')


        // Disconnect from the gateway.
        await gateway.disconnect() // gateway 끊음.

        // res.status(200).json({response: 'Transaction has been submitted'})  // 그후 동작들.

        res.send('<script type="text/javascript">var r = alert("Transaction has been submitted. "); window.location.href="/" ; </script>')

        // res.redirect('/')

        } catch (error) {

            console.error(`Failed to submit transaction: ${error}`)

            res.status(400).json(error)

        }  
    })


그 외에 changeowner도 똑같이 작동한다. 중요한 것은

fabcar까지 contract를 연결 한다음 await contract.submitTransaction할 때 첫번재 인자로 무엇을 할지를 넣는 것이고 그 다음 인자로 정확한 값들을 넘겨주는 것이 중요한 것 같다.

출처 :https://cafe.naver.com/hyperledgerstudy