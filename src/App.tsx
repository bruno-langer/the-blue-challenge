import { useContext, useEffect } from "react"
import NavBar from "./components/Navbar"
import { getAssets, getCompanies, getLocations } from "./api/data"
import { DataContext } from "./contexts/DataContext"
import AssetsTree from "./components/AssetsTree/AssetsTree"
import addImage from './assets/addImage.png'
import sensor from './assets/sensor.png'
import router from './assets/router.png'


function App() {

  const { data, setData } = useContext(DataContext)

  useEffect(() => {
    getCompanies().then((res) => {
      setData({ ...data, companies: res })
      if (res[0].id)
        getLocations(res[0].id).then((locationRes) => {
          getAssets(res[0].id).then((assetsRes) => {
            setData({ ...data, locations: locationRes, assets: assetsRes, companies: res })
          })
        })
    })
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <NavBar />
      <main style={{ display: "flex", flexDirection: "row", flex: 1, padding: "1em", boxSizing: "border-box", gap: "1em" }}>
        <div style={{ width: "32%" }}>
          <AssetsTree>

          </AssetsTree>
        </div>

        <div style={{ width: "68%", height: "100%", border: "1px solid #D8DFE6", borderRadius: "0.25em" }}>
          {data.selectedComponent && <>
            <header style={{ display: "flex", alignItems: "center", gap: "1em", padding: "1em", borderBottom: "1px solid #D8DFE6" }}>
              <h2 style={{ margin: 0 }}>
                {data.selectedComponent?.name}
              </h2>
              <div style={{ width: "0.5em", height: "0.5em", backgroundColor: data.selectedComponent?.status === "operating" ? "#52C41A" : "#ED3833", borderRadius: "50%" }}></div>
            </header>
            <main style={{ display: "flex", flexDirection: "column", padding: "1em" }}>
              <div style={{ display: "flex", gap: "1em", alignItems: "center", borderBottom: "1px solid #D8DFE6", paddingBottom: "2em" }}>
                <img src={addImage} alt="" />
                <div style={{ display: "flex", flexDirection: "column", gap: "2em", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #D8DFE6", paddingBottom: "1em", gap: "1em" }}>
                    <strong>Tipo de Equipamento</strong>
                    <span>Motor Trifásico</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1em" }} >
                    <strong>Responsáveis</strong>
                    <span style={{ display: "flex", gap: "0.5em", width: "fit-content", height: "fit-content" }}>
                      <span style={{ backgroundColor: "#2188FF", display: "flex", alignItems: "center", justifyContent: "center", width: "1.5em", height: "1.5em", borderRadius: "100%", color: "white" }}
                      >S</span>
                      Setor S
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1em", alignItems: "center", paddingTop: "2em" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: "0.25em" }}>
                  <strong>Sensor</strong>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25em" }}>
                    <img src={sensor} alt="sensor code icon" />
                    {data.selectedComponent?.sensorId}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: "0.25em" }}>
                  <strong>Receptor</strong>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25em" }}>
                    <img src={router} alt="router code icon" />
                    {data.selectedComponent?.gatewayId}
                  </div>
                </div>
              </div>

            </main>
          </>}
        </div>
      </main>
    </div>
  )
}

export default App
