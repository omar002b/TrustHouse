import supabase from "@/lib/supabaseClient"
import { Database } from "@/database.types"


type PropertyData = Database["public"]["Tables"]["properties"]["Insert"]



export async function readProperties() {
    let { data: properties, error } = await supabase
        .from('properties')
        .select('*')
    return { properties, error }
}

export async function createProperty(propertyData: PropertyData) {
    const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
    return { data, error }
}

export async function updateProperty(propertyData: Partial<PropertyData> & { id: string }) {
    console.log('updateProperty called with data:', propertyData)
    const { data, error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', propertyData.id)
        .select()
    return { data, error }
}

export async function deleteProperty(propertyData: Partial<PropertyData> & { id: string }) {
    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyData.id)
    return { error }
}