import React, { useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogPosts, getBlogPostBySlug, getBlogPostById } from '../data/blogPosts';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect legacy ?id=X links to /blogi/[slug]
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const idParam = searchParams.get('id');
    if (idParam) {
      const post = getBlogPostById(parseInt(idParam, 10));
      if (post) {
        navigate(`/blogi/${post.slug}`, { replace: true });
      }
    }
  }, [location.search, navigate]);

  const selectedPost = slug ? getBlogPostBySlug(slug) : null;
  const otherPosts = selectedPost ? blogPosts.filter(p => p.id !== selectedPost.id).slice(0, 2) : [];

  return (
    <div className="pt-20 bg-white">
      <SEO 
        title={selectedPost ? selectedPost.metaTitle : undefined} 
        description={selectedPost ? selectedPost.metaDescription : undefined} 
      />
      
      <section className="py-32 max-w-7xl mx-auto px-4 pb-60">
        {selectedPost ? (
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-20 rounded-[4rem] shadow-2xl shadow-[#00001C]/5 border border-[#00001C]/5">
            <Link 
              to="/blogi"
              className="inline-flex items-center gap-2 text-[#00001C]/60 font-semibold uppercase tracking-widest text-[10px] mb-12 hover:text-[#D4AF37] transition-colors"
            >
              <span className="material-icons-outlined text-sm">west</span>
              Takaisin blogiin
            </Link>
            
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 text-[#00001C]/50 text-xs font-semibold uppercase tracking-widest mb-6">
                <time dateTime={selectedPost.datePublished}>{selectedPost.date}</time>
                <span>•</span>
                <span>Kirjoittaja: {selectedPost.author}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#00001C] tracking-tight leading-tight mb-12">
                {selectedPost.title}
              </h1>

              <div className="mb-12 rounded-[2rem] overflow-hidden border border-[#00001C]/5">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-auto object-contain bg-slate-50"
                />
              </div>

              <div 
                className="prose prose-slate max-w-none text-[#00001C]/70 leading-relaxed space-y-8"
                dangerouslySetInnerHTML={{ 
                  __html: selectedPost.content
                    .replace(/text-white/g, 'text-[#00001C]')
                    .replace(/font-black/g, 'font-semibold')
                    .replace(/italic/g, '')
                    .replace(/uppercase/g, '') 
                    .replace(/text-primary/g, 'text-[#D4AF37]')
                }}
              />
            </div>

            {/* Lue myös -osio */}
            <div className="mt-24 pt-16 border-t border-[#00001C]/10 space-y-12">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">Syvenny aiheeseen</span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#00001C] tracking-tight">Lue myös nämä artikkelit</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {otherPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/blogi/${post.slug}`}
                    className="p-8 bg-[#00001C] rounded-[2rem] border border-white/5 group block transition-all shadow-xl shadow-black/20 hover:border-white/10"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden mb-6">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-3">
                      <time dateTime={post.datePublished}>{post.date}</time>
                    </p>
                    <h4 className="text-lg font-semibold text-white mb-4 tracking-tight leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>
                    <span className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest flex items-center gap-2">
                      Lue artikkeli
                      <span className="material-icons-outlined text-xs">east</span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* Pikalinkit palveluihin ja laskuriin */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#00001C]/5 border border-[#00001C]/10">
                <div className="text-center sm:text-left">
                  <p className="text-[#00001C] font-bold text-base">Suunnitteletko lattiaremonttia?</p>
                  <p className="text-[#00001C]/60 text-xs mt-1">Tutustu palveluvaihtoehtoihin tai laske alustava kustannusarvio heti.</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link 
                    to="/palvelut"
                    className="px-6 py-3 rounded-full bg-[#00001C] hover:bg-[#00001C]/90 text-white text-xs font-semibold uppercase tracking-widest transition-all"
                  >
                    Palvelut
                  </Link>
                  <Link 
                    to="/laskuri"
                    className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#AA8B2E] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md shadow-[#D4AF37]/20"
                  >
                    Hintalaskuri
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-24 p-16 bg-[#00001C] rounded-[4rem] border border-white/5 text-center shadow-2xl shadow-black/20">
              <h3 className="text-2xl font-semibold text-white mb-6">Kiinnostuitko?</h3>
              <p className="text-white/60 mb-12 font-medium">Ota yhteyttä niin suunnitellaan sinullekin kestävä ja upea lattia.</p>
              <Link 
                to="/yhteystiedot" 
                className="inline-block bg-[#D4AF37] hover:bg-[#AA8B2E] text-white px-16 py-5 rounded-full font-semibold uppercase tracking-widest transition-all shadow-xl shadow-[#D4AF37]/20 hover:translate-y-[-2px]"
              >
                Pyydä tarjous
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-24">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#00001C] mb-8 tracking-tight">Blogi</h1>
              <p className="max-w-2xl mx-auto text-[#00001C]/60 text-base sm:text-lg font-medium leading-relaxed">
                Ajatuksia, vinkkejä ja uutisia lattiapinnoituksen maailmasta.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {blogPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blogi/${post.slug}`}
                  className="bg-[#00001C] rounded-[2.5rem] overflow-hidden border border-white/5 group block transition-all shadow-2xl shadow-black/20 hover:border-white/10"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${post.id === 3 ? 'object-[center_65%]' : 'object-[center_80%]'}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">
                      <time dateTime={post.datePublished}>{post.date}</time>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-6 tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div 
                      className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-widest flex items-center gap-3"
                    >
                      Lue lisää
                      <span className="material-icons-outlined text-sm">east</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Blog;
