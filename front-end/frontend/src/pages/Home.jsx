{/*
import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <h1>Home Page</h1>
    </div>
  )
}

export default Home */}





import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ClipboardCheck, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button'; // ShadCN Button

// Swiper.js imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const HomePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-slate-50 text-gray-800">
      {/* Section 1: Hero Section */}
      <section className="text-center py-20 sm:py-32 px-4 bg-gradient-to-b from-white to-slate-100 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight"
        >
          Bring clarity to your daily tasks.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-600"
        >
          Task Manager Pro helps you organize your work, track progress, and achieve your goals effortlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Button asChild size="lg" className="shadow-lg">
            <Link to="/register">Get Started - It's Free</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/login">Login →</Link>
          </Button>
        </motion.div>
      </section>

      {/* Section 2: Features Section */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800">Everything you need, nothing you don't.</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ClipboardCheck, title: "Intuitive & Fast", desc: "Add new tasks in seconds. Our clean interface stays out of your way." },
              { icon: TrendingUp, title: "Track Your Progress", desc: "Visualize your accomplishments with simple stats and stay motivated." },
              { icon: Users, title: "Make It Yours", desc: "Use filters and colors to organize your tasks exactly the way you want." }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <feature.icon size={40} className="text-blue-500" />
                <h3 className="mt-4 text-xl font-semibold text-slate-800">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Testimonials Section with Swiper */}
      <section className="bg-slate-100 py-20 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800">Loved by professionals worldwide.</h2>
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mt-12"
            >
              {[
                { name: 'Priya Sharma', role: 'Designer', text: 'This app completely changed the way I organize my projects. It\'s a lifesaver!' },
                { name: 'Amit Kumar', role: 'Developer', text: 'Finally, a task manager that\'s both powerful and simple to use. Highly recommended.' },
                { name: 'Sunita Roy', role: 'Manager', text: 'My team\'s productivity has skyrocketed since we started using Task Manager Pro.' }
              ].map((testimonial) => (
                <SwiperSlide key={testimonial.name} className="p-8">
                  <blockquote className="text-xl italic text-slate-700">"{testimonial.text}"</blockquote>
                  <p className="mt-4 font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
      </section>

      {/* Section 4: Final Call to Action */}
      <section className="text-center py-20 sm:py-24 px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-3xl font-bold text-slate-800">Ready to organize your life?</h2>
          <div className="mt-8">
            <Button asChild size="lg" className="shadow-lg text-lg h-14 px-8">
              <Link to="/register">Sign Up Now</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Section 5: Footer */}
      <footer className="bg-slate-800 text-slate-400 text-center py-8 px-4">
        <p>&copy; {new Date().getFullYear()} Task Manager Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;