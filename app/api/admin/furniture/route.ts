//C:\Users\Shanon\al-rajjak-1\app\api\admin\furniture\route.ts



// app/api/admin/furniture/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "furn.json");
const publicFurnDir = path.join(process.cwd(), "public", "furn");

// ডিরেক্টরি চেক
if (!fs.existsSync(publicFurnDir)) fs.mkdirSync(publicFurnDir, { recursive: true });
if (!fs.existsSync(path.join(publicFurnDir, "beds"))) fs.mkdirSync(path.join(publicFurnDir, "beds"), { recursive: true });
if (!fs.existsSync(path.join(publicFurnDir, "sofas"))) fs.mkdirSync(path.join(publicFurnDir, "sofas"), { recursive: true });

const readJSON = () => {
  if (!fs.existsSync(filePath)) {
    return { store_name: "LemonSKN Demo Shop", inventory: { beds: [], sofas: [] } };
  }
  const fileData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileData);
};

const writeJSON = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readJSON();
  const allItems = [
    ...(data.inventory?.beds || []).map((i: any) => ({ ...i, category: "beds" })),
    ...(data.inventory?.sofas || []).map((i: any) => ({ ...i, category: "sofas" }))
  ];
  return NextResponse.json(allItems);
}

export async function POST(req: Request) {
  try {
    const newItem = await req.json();
    const { image, category, name, price, type,
      material_type, fabric_name, fabric_properties, cleaning_method, is_vegan,
      frame_material, wood_type, wood_origin, fsc_certified, frame_warranty_years,
      foam_type, foam_density, seat_construction, seat_hardness,
      width_cm, depth_cm, height_cm, seat_height_cm, seat_depth_cm, armrest_height_cm, leg_height_cm, robot_vacuum_clearance,
      warranty_years, extended_available, extended_years, extended_cost_eur, return_days,
      delivery_days, delivery_cost_eur, assembly_available, assembly_cost_eur, old_removal,
      color, colors_available, oeko_tex, fire_resistant, max_load_kg,
      installment_available, monthly_payment_eur, description } = newItem;
    
    let finalImageUrl = "/furn/no-photo.png";

    if (image && image.startsWith("data:image")) {
      const categoryFolder = category === "sofas" ? "sofas" : "beds";
      const targetDir = path.join(publicFurnDir, categoryFolder);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      const fileName = `item-${Date.now()}.webp`;
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync(path.join(targetDir, fileName), Buffer.from(base64Data, "base64"));
      finalImageUrl = `/furn/${categoryFolder}/${fileName}`;
    }

    const colorsArray = colors_available ? colors_available.split(',').map((c: string) => ({ name: c.trim(), code: "#000000", in_stock: true })) : [{ name: color || "Standard", code: "#000000", in_stock: true }];

    const newProduct = {
      id: `ADMIN-${Date.now()}`,
      brand: "Admin Added",
      title: name,
      type: type || (category === "sofas" ? "Sofa / Couch" : "Bed / Bett"),
      status: "Neu im Sortiment",
      pricing: {
        original_price: Math.round(parseFloat(price) * 1.2),
        current_price: parseFloat(price),
        currency: "EUR",
        discount_label: "-20%"
      },
      material_info: {
        type: material_type || "Fabric",
        fabric_name: fabric_name || "",
        fabric_composition: "100% Polyester",
        fabric_properties: fabric_properties || "",
        cleaning_method: cleaning_method || "Wipe with damp cloth",
        is_vegan: is_vegan || true
      },
      frame_info: {
        material: frame_material || "Solid Wood",
        wood_type: wood_type || "",
        wood_origin: wood_origin || "",
        fsc_certified: fsc_certified || false,
        construction: "Standard",
        frame_warranty_years: frame_warranty_years || 2
      },
      cushion_info: {
        foam_type: foam_type || "HR foam",
        foam_density: foam_density || "30kg/m³",
        seat_construction: seat_construction || "Pocket springs",
        seat_hardness: seat_hardness || "Medium",
        back_cushion_filled: "Fiber",
        back_cushion_detachable: true
      },
      dimensions_info: {
        width_cm: parseInt(width_cm) || 0,
        depth_cm: parseInt(depth_cm) || 0,
        height_cm: parseInt(height_cm) || 0,
        seat_height_cm: parseInt(seat_height_cm) || 0,
        seat_depth_cm: parseInt(seat_depth_cm) || 0,
        armrest_height_cm: parseInt(armrest_height_cm) || 0,
        leg_height_cm: parseInt(leg_height_cm) || 0,
        robot_vacuum_clearance: robot_vacuum_clearance || false
      },
      warranty_info: {
        warranty_years: warranty_years || 2,
        extended_available: extended_available || false,
        extended_years: extended_years || 5,
        extended_cost_eur: extended_cost_eur || 49,
        return_days: return_days || 14,
        return_policy: "Free return within 14 days"
      },
      delivery_info: {
        delivery_days: delivery_days || 5,
        delivery_cost_eur: delivery_cost_eur || 0,
        assembly_available: assembly_available || false,
        assembly_cost_eur: assembly_cost_eur || 79,
        old_furniture_removal: old_removal || false
      },
      colors_available: colorsArray,
      certifications: {
        oeko_tex: oeko_tex || false,
        fsc: fsc_certified || false,
        fire_resistant: fire_resistant || true
      },
      load_capacity: {
        max_weight_kg: max_load_kg || 150,
        per_seat_kg: Math.round((max_load_kg || 150) / 3),
        daily_use_years: 8
      },
      payment_info: {
        installment_available: installment_available || false,
        monthly_payment_eur: monthly_payment_eur || Math.round(parseFloat(price) / 24),
        payment_methods: ["PayPal", "Credit Card", "Bank Transfer"]
      },
      images: [finalImageUrl],
      features: ["Neu hinzugefügt", "Premium Qualität", "Sofort verfügbar"],
      description: description || "Ein hochwertiges Möbelstück, neu in unserer Kollektion.",
      details: {
        color: color || "Weiß/Schwarz",
        dimensions: `${width_cm || 0} x ${depth_cm || 0} cm`,
        frame_material: frame_material || "Hochwertiges Holz",
        fabric: fabric_name || "Premium Stoff",
        max_load: `${max_load_kg || 150} kg`
      }
    };

    const data = readJSON();
    const targetCategory = category === "sofas" ? "sofas" : "beds";
    if (!data.inventory[targetCategory]) data.inventory[targetCategory] = [];
    data.inventory[targetCategory].push(newProduct);
    writeJSON(data);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Upload failed" });
  }
}

// PUT এবং DELETE আগের মতোই থাকবে
export async function PUT(req: Request) { ... }
export async function DELETE(req: Request) { ... }