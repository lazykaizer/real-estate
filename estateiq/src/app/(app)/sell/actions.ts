"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPropertyListing(formData: FormData) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('You must be logged in to create a listing')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const property_type = formData.get('property_type') as string
    const listing_type = formData.get('listing_type') as string
    const price = parseFloat(formData.get('price') as string)
    const bedrooms = parseInt(formData.get('bedrooms') as string, 10)
    const bathrooms = parseInt(formData.get('bathrooms') as string, 10)
    const area_sqft = parseFloat(formData.get('area_sqft') as string)
    const location_address = formData.get('location_address') as string
    const location_city = formData.get('location_city') as string

    const uploadedUrls: string[] = []
    const imageFiles = formData.getAll('images')

    // Handle Image Uploads First
    if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
            // Check if it's a valid File object and has size
            if (file instanceof File && file.size > 0) {
                // Generate a unique safe filename
                const fileExt = file.name.split('.').pop()
                const uniqueFileName = `${user.id}-${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

                const { data: uploadData, error: uploadError } = await supabase
                    .storage
                    .from('property-images')
                    .upload(uniqueFileName, file, { upsert: false })

                if (uploadError) {
                    console.error("Image Upload Error:", uploadError)
                } else if (uploadData) {
                    const { data: publicData } = supabase
                        .storage
                        .from('property-images')
                        .getPublicUrl(uploadData.path)

                    if (publicData?.publicUrl) {
                        uploadedUrls.push(publicData.publicUrl)
                    }
                }
            }
        }
    }

    // Fallback if the user uploaded nothing or upload failed
    const finalImages = uploadedUrls.length > 0 ? uploadedUrls : [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053"
    ]

    const { error } = await supabase.from('properties').insert({
        owner_id: user.id,
        title,
        description,
        property_type,
        listing_type,
        price,
        bedrooms,
        bathrooms,
        area_sqft,
        location_address,
        location_city,
        images: finalImages
    }).select().single()

    if (error) {
        console.error("Supabase Insertion Error:", error)
        throw new Error('Failed to create listing')
    }

    // Next.js Cache Revalidation: Instantly updates data everywhere
    revalidatePath('/')
    revalidatePath('/buy')
    revalidatePath('/rent')
    revalidatePath('/agents')

    // Navigate the user to the buy page so they can see their fresh listing
    redirect('/buy')
}
