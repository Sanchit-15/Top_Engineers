import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Send,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  Building,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { getStoredData, INITIAL_ENQUIRIES, setStoredData, STORAGE_KEYS } from '../data/mockAdminData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errors = {};
    if (!formData.customer_name.trim()) {
      errors.customer_name = 'Customer name is required.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Contact phone number is required.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (8-15 digits).';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Please specify the machinery type or inquiry subject.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please describe your workshop or machining requirements.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    setTimeout(() => {
      try {
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
        setStoredData(STORAGE_KEYS.ENQUIRIES, [{
          ...formData, id: `enq-demo-${Date.now()}`, status: 'New', internal_notes: '', created_at: new Date().toISOString(),
        }, ...enquiries]);
        setSubmitSuccess(true);
        setFormData({ customer_name: '', phone: '', email: '', subject: '', message: '' });
      } catch (error) {
        console.error('Could not save contact enquiry:', error);
        setSubmitError('We could not save this demonstration enquiry. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900">
      {/* 1. Softened Dark Hero Banner with Breadcrumbs */}
      <section className="bg-[#0A1628] text-white pt-32 pb-16 border-b border-[#1E3554]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400 font-semibold">Contact</span>
          </div>

          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">
            REQUEST FOR QUOTATION (RFQ)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contact Top Engineers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Connect directly with our Batala manufacturing works for machinery quotations, technical specifications, or workshop machinery inquiries.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            {/* Left Column: Verified Location & Verification Notice */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    MANUFACTURING WORKS
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#050B16] mt-1">
                    Works & Office Address
                  </h2>
                </div>

                {/* Verified Location Card */}
                <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#050B16] text-base">Top Engineers Works</h3>
                      <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                        28-BF, Industrial Estate, Batala, Punjab 143505, India
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                    <span>Gurdaspur District, Punjab</span>
                    <Badge variant="verified">Verified</Badge>
                  </div>
                </div>

                {/* Contact Policy Notice */}
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>Contact Verification Policy</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed text-[11px]">
                    Direct telephone numbers, official email addresses, and WhatsApp links will be published once verified with the business owner. Please submit your inquiry using this form to reach our works.
                  </p>
                </div>

                <div className="pt-1">
                  <a
                    href="https://www.justdial.com/Batala/Top-Engineers-Industrial-Estate-Ajit-Nagar/9999P1871-1871-100731103808-T4C6_BZDET"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1.5"
                  >
                    <span>View Public Registry Record (Justdial Batala)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Batala Industrial Hub Card */}
              <div className="bg-[#0A1628] text-white p-6 rounded-lg border border-[#1E3554]/70 space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-500" />
                  <h4 className="font-bold text-white text-base">
                    Batala Industrial Hub
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Batala’s Industrial Estate is a premier machine tools center. Workshops throughout India source cast iron lathes, planers, and heavy industrial machinery directly from this manufacturing hub.
                </p>
              </div>
            </div>

            {/* Right Column: Working Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-sm">
                <div className="border-b border-slate-200 pb-5 mb-8">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    ONLINE RFQ & INQUIRY
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#050B16] mt-1">
                    Send a Machinery Inquiry
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Please provide your machining requirements. Submissions will be recorded and processed by our Batala team.
                  </p>
                </div>

                {submitSuccess && (
                  <div className="mb-8 p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-emerald-950">
                          Inquiry Successfully Submitted!
                        </h4>
                        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                          Thank you for contacting Top Engineers. Your machinery specifications have been registered. Our Batala office will contact you regarding pricing and delivery.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmitSuccess(false)}
                          className="mt-2.5 text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                        >
                          Send another inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {submitError && <p role="alert" className="mb-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{submitError}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Customer / Workshop Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="e.g. Apex Engineering Works"
                      className={`w-full px-4 py-3 rounded-[4px] border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                        formErrors.customer_name
                          ? 'border-red-400 bg-red-50/50'
                          : 'border-slate-300 focus:border-blue-600'
                      }`}
                    />
                    {formErrors.customer_name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.customer_name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Phone Number <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full px-4 py-3 rounded-[4px] border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                          formErrors.phone
                            ? 'border-red-400 bg-red-50/50'
                            : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Email Address <span className="text-slate-400 text-[11px]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. contact@apexeng.com"
                        className={`w-full px-4 py-3 rounded-[4px] border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                          formErrors.email
                            ? 'border-red-400 bg-red-50/50'
                            : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Machinery Type / Subject <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Heavy Duty Lathe 10ft Bed / Plano Miller Quotation"
                      className={`w-full px-4 py-3 rounded-[4px] border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                        formErrors.subject
                          ? 'border-red-400 bg-red-50/50'
                          : 'border-slate-300 focus:border-blue-600'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Detailed Machine Requirements <span className="text-blue-600">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify workpiece size, required bed length, swing over bed, motor HP, or delivery destination."
                      className={`w-full px-4 py-3 rounded-[4px] border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                        formErrors.message
                          ? 'border-red-400 bg-red-50/50'
                          : 'border-slate-300 focus:border-blue-600'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full justify-center"
                      icon={Send}
                    >
                      {isSubmitting ? 'Submitting Inquiry...' : 'Submit Quotation Request'}
                    </Button>
                    <p className="mt-2.5 text-center text-xs text-slate-400">
                      Top Engineers does not share customer inquiry details with third parties.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
