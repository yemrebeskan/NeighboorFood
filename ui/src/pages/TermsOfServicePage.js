import React from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
const TermsOfServicePage = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div
      className={
        authCtx.isOnClickedSignButton
          ? 'blur-sm container mx-auto py-8'
          : 'container mx-auto py-8'
      }
    >
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-800 text-lg mb-4">
        Welcome to NeighborFood! These Terms of Service outline the rules and
        regulations for the use of our website and services.
      </p>
      <h2 className="text-xl font-bold mb-2">Acceptance of Terms</h2>
      <p className="text-gray-800 text-lg mb-4">
        By accessing or using our website, you agree to comply with these Terms
        of Service. If you do not agree with any part of these terms, please do
        not use our services.
      </p>
      <h2 className="text-xl font-bold mb-2">Use of Our Services</h2>
      <p className="text-gray-800 text-lg mb-4">
        When using our services, you agree to abide by any posted guidelines or
        rules. You are responsible for maintaining the confidentiality of your
        account information and for all activities that occur under your
        account.
      </p>
      <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
      <p className="text-gray-800 text-lg mb-4">
        All content on our website, including text, graphics, logos, images, and
        software, is the property of NeighborFood and protected by intellectual
        property laws. You may not reproduce, distribute, modify, or create
        derivative works without our explicit permission.
      </p>
      <h2 className="text-xl font-bold mb-2">Limitation of Liability</h2>
      <p className="text-gray-800 text-lg mb-4">
        We strive to provide accurate and up-to-date information, but we do not
        guarantee the completeness, reliability, or accuracy of any content on
        our website. We are not liable for any damages or losses resulting from
        the use of our services.
      </p>
      <h2 className="text-xl font-bold mb-2">Changes to the Terms</h2>
      <p className="text-gray-800 text-lg mb-4">
        We reserve the right to modify or replace these Terms of Service at any
        time. Any changes will be posted on our website, and your continued use
        of our services after the changes constitutes acceptance of the modified
        terms.
      </p>
      <h2 className="text-xl font-bold mb-2">Contact Us</h2>
      <p className="text-gray-800 text-lg mb-4">
        If you have any questions or concerns regarding our Terms of Service,
        please contact us for further assistance.
      </p>
    </div>
  )
}

export default TermsOfServicePage
