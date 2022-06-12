const canvasObj = document.getElementById("babylon")

const canvasEngine = new BABYLON.Engine(canvasObj, true)

const loadModelEl = document.getElementById("loadModel-btn")

const changeColorEl = document.getElementById("changeColor-btn")

const deleteModelEl = document.getElementById("deleteModel-btn")

let sliderEl = document.getElementById("zoomSlider")

let zoomValue = sliderEl.value

let isModelLoaded = false

let isColorChanged = false

let isSceneInitialized = false

let deletetest = false

loadModelEl.addEventListener("click", () => {
	isModelLoaded = true
    isColorChanged = false
    loadScene()
})

changeColorEl.addEventListener("click", () => {
	
    isColorChanged = true
    loadScene()
})

sliderEl.addEventListener("input", () => {

    zoomValue = sliderEl.value
    loadScene()
})

deleteModelEl.addEventListener("click", () => {
	
    if(!deletetest){
        loadScene()
        deletetest = true
    }
    isColorChanged = false
    isModelLoaded = false
    loadScene()

})

function createCamera(scene, canvas){
    
    const camera = new BABYLON.ArcRotateCamera(
        "arcCamera", 
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        zoomValue, 
        BABYLON.Vector3.Zero()
        )
    return camera
}

function createShape(scene){
  
    if(isModelLoaded){
        let renderShape =  new BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 5}, scene)
        renderShape.material = new BABYLON.StandardMaterial("renderShapeMat", scene)
        if(isColorChanged){
            renderShape = changeColor(renderShape)
            return renderShape
        }
        return renderShape
    }
    else{
        console.log("No model rendered")
    }
}

function createLight(scene){
    const hemiLight = new BABYLON.HemisphericLight('hemiLight', new BABYLON.Vector3(0, 20, 0), scene)
    return hemiLight
}

function initalizeScene(engine, canvas){

    let mainScene = new BABYLON.Scene(engine)

    mainScene.clearColor =  new BABYLON.Color3.White()

    let camera = createCamera(mainScene, canvas)

    let shape = createShape(mainScene)

    let light = createLight(mainScene)
    
    return mainScene
}

function loadScene(){
    let newScene = initalizeScene(canvasEngine, canvasObj)  
    canvasEngine.runRenderLoop(function(){
        newScene.render()
    })
}

function changeColor(updateColor){
    //updateColor.material.diffuseColor = BABYLON.Color3.Green()
    updateColor.material.diffuseColor = BABYLON.Color3.Red()
    return updateColor
}


