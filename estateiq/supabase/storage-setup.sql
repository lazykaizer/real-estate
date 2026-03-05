-- Create a public bucket for property images
insert into storage.buckets (id, name, public) 
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

-- Allow public access to view the images
create policy "Public Access" 
on storage.objects for select 
using (bucket_id = 'property-images');

-- Allow authenticated users to upload images
create policy "Authenticated users can upload" 
on storage.objects for insert 
with check (
    bucket_id = 'property-images' 
    and auth.role() = 'authenticated'
);
