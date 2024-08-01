import location from "../../assets/location.png"
import assets from "../../assets/asset.png"
import components from "../../assets/component.png"
import arrow from "../../assets/arrow-down.png"

const PADDING_FROM_PARENT = '1.5em'


const getCategory = (obj: any) => {
    if (obj.sensorType) return 'component'
    if (!obj.sensorType && obj.locationId) return 'asset'
    if (!obj.sensorType && obj.assetSection) return 'asset'
    if (!obj.sensorType && obj.parentId) return 'location'
    return 'location'
}

const icon = {
    'component': { src: components, alt: "components" },
    'asset': { src: assets, alt: "assets" },
    'location': { src: location, alt: "location" },
}

export default function AssetTreeItem({ obj, openIdsArray, toggle, renderChild, isChild, isFiltered }: { obj: any, openIdsArray: string[], toggle: (id: string) => void, renderChild: (arr: any[]) => any, isChild?: boolean, isFiltered: boolean }) {


    return <div className="asset-item">
        <div onClick={(e) => { e.stopPropagation(); toggle(obj); console.log(obj) }} style={{
            paddingLeft: isChild ? PADDING_FROM_PARENT : "0", cursor: "pointer",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25em" }}>
                {obj.childNodes.length > 0 ? <img src={arrow} /> : <div style={{ width: "0.6em" }}></div>}
                <img {...icon[getCategory(obj)]} style={{ width: "1,375em", aspectRatio: 1 }} />
                {obj.name}
                {(obj.sensorType === "energy" || obj.sensorType === "vibration") && <div style={{ width: "0.5em", marginLeft: "0.25em", height: "0.5em", backgroundColor: obj.status === "operating" ? "#52C41A" : "#ED3833", borderRadius: "50%" }}></div>}
            </div>
            {(openIdsArray.includes(obj.id) || isFiltered) && renderChild(obj.childNodes)}
        </div>
    </div >

}