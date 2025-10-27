# 🚀 Quick Start: Import Your Blog Posts into Strapi

## ✅ Your blog is already updated to use Strapi CMS!

The `Blog.tsx` component has been modified to fetch blogs from Strapi instead of static JSON.

---

## 📦 Import Your Blog Posts (Easy Way)

### Option 1: Use the Automated Script

```bash
./import-blogs.sh
```

This interactive script will:
1. Check if Strapi is running
2. Ask you to create an API token
3. Import all 6 blog posts from `blog.json`
4. Show you what to do next

### Option 2: Manual Steps

Follow these steps if you prefer to do it manually:

#### 1. Start Strapi (if not already running)
```bash
cd cms
npm run dev
```
Wait for it to start (takes ~30 seconds)

#### 2. Create Admin Account
- Open `http://localhost:1337/admin`
- Create your admin account (first time only)

#### 3. Generate API Token
- In Strapi admin panel, go to **Settings** > **API Tokens**
- Click **Create new API Token**
- Set:
  - Name: `Blog Import Token`
  - Type: `Full access`
  - Duration: `Unlimited`
- Click **Save** and **COPY THE TOKEN**

#### 4. Run Import Script
```bash
export STRAPI_API_TOKEN="paste-your-token-here"
cd cms
npm run auto-setup-blog
```

#### 5. Configure Environment
```bash
cd ..
echo "VITE_STRAPI_URL=http://localhost:1337" > .env.local
```

#### 6. Start Frontend
```bash
npm run dev
```

---

## 🎉 What Happens After Import?

After running the import script, you'll have:

✅ **Author**: Amir Qafari profile  
✅ **6 Categories**: Web Development, React, TypeScript, Portfolio, AI & Technology, Developer Tools  
✅ **30+ Tags**: All tags from your blog posts  
✅ **6 Blog Posts**: All posts from `blog.json` imported  

### View Your Blogs in Strapi

1. Go to `http://localhost:1337/admin`
2. Click **Content Manager** > **Blog Post**
3. You'll see all your imported posts!

### Edit Blogs

Click on any blog post to edit it. You can:
- Change content
- Update title, excerpt
- Change category or tags
- Upload featured images
- Add SEO metadata

---

## 🎯 How to Change Blogs Now

### Via Strapi Admin (Recommended)

1. Open `http://localhost:1337/admin`
2. Go to **Content Manager** > **Blog Post**
3. Click on a post to edit
4. Make your changes
5. Click **Save** and **Publish**

**No code changes needed!** Just edit in the admin panel.

### Add New Blog Post

1. In Strapi admin, click **Create new entry**
2. Fill in all the fields:
   - Title
   - Slug (auto-generated)
   - Excerpt
   - Content (Markdown supported)
   - Published date
   - Reading time
   - Category
   - Tags
   - Featured image
3. Click **Save** and **Publish**

---

## 🔧 Fallback to Static JSON

If you prefer to use the static JSON file instead of Strapi:

1. Edit `src/data/blog.json`
2. Update `src/components/pages/Blog.tsx`:
   - Change import from `blogApi` to `blogData`
   - Use `blogData.blogs` directly
3. Rebuild your app

---

## 📝 Files Created/Modified

### Modified Files
- ✅ `src/components/pages/Blog.tsx` - Now fetches from Strapi CMS

### Created Files
- ✅ `BLOG_SETUP_GUIDE.md` - Comprehensive setup guide
- ✅ `SETUP_BLOG_NOW.md` - Quick setup instructions
- ✅ `QUICK_START.md` - This file
- ✅ `import-blogs.sh` - Automated import script

### Existing Files (Not Modified)
- ✅ `src/data/blog.json` - Your original blog data (still there as backup)
- ✅ `src/api/blogApi.ts` - API service for Strapi (already existed)

---

## 🎨 Test Your Blog

After importing:

1. Make sure Strapi is running
2. Make sure `.env.local` exists with `VITE_STRAPI_URL=http://localhost:1337`
3. Start your frontend: `npm run dev`
4. Visit your blog page
5. You should see all 6 blog posts loading from Strapi!

---

## 🐛 Troubleshooting

### Blogs not showing?

1. **Check Strapi is running**: `curl http://localhost:1337/admin`
2. **Verify `.env.local` exists** with correct URL
3. **Check browser console** for errors
4. **Verify posts were imported**: Visit Strapi admin panel

### Want to start over?

```bash
# Stop Strapi
# Delete the database
cd cms
rm -rf .cache
rm -rf database

# Restart Strapi (will reset everything)
npm run dev

# Then run import script again
./import-blogs.sh
```

---

## 📚 Next Steps

After successful import:

1. ✅ Customize your blog posts in Strapi admin
2. ✅ Add more blog posts
3. ✅ Upload custom featured images
4. ✅ Add more categories and tags
5. ✅ Deploy Strapi to production
6. ✅ Update `.env.local` with production URL

---

## 🎊 You're All Set!

Your blog now uses dynamic content management through Strapi CMS. Enjoy! 🚀

