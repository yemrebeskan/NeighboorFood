import React from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
const PrivacyPage = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div
      className={
        authCtx.isOnClickedSignButton
          ? 'blur-sm container mx-auto px-4 py-8'
          : 'container mx-auto px-4 py-8'
      }
    >
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-800 text-lg mb-4">
        We respect your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and
        disclose your information when you use our website or services.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
      <p className="text-gray-800 text-lg mb-4">
        When you sign up for an account, we collect your name, email address,
        and other contact details. We may also collect information about your
        usage of our services, such as your preferences and interactions with
        our website.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">
        How We Use Your Information
      </h2>
      <p className="text-gray-800 text-lg mb-4">
        We use your information to provide and improve our services, personalize
        your experience, communicate with you, and send you relevant updates and
        offers. We may also use your information for analytics purposes to
        understand user trends and enhance our website's functionality.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Sharing of Information</h2>
      <p className="text-gray-800 text-lg mb-4">
        We may share your information with trusted third-party service providers
        who assist us in delivering our services. However, we do not sell, rent,
        or disclose your personal information to third parties for their
        marketing purposes.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Security Measures</h2>
      <p className="text-gray-800 text-lg mb-4">
        We take appropriate security measures to protect your information from
        unauthorized access, disclosure, alteration, or destruction. We
        regularly review and update our security practices to ensure the safety
        of your data.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices</h2>
      <p className="text-gray-800 text-lg mb-4">
        You have the right to access, update, or delete your personal
        information. You can manage your preferences and communication settings
        by logging into your account or contacting our support team.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">
        Changes to this Privacy Policy
      </h2>
      <p className="text-gray-800 text-lg mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any material changes by posting the updated policy on our website or
        through other communication channels.
      </p>
      <p className="text-gray-800 text-lg mb-4">
        Please review this Privacy Policy periodically to stay informed about
        how we collect, use, and protect your information.
      </p>
    </div>
  )
}

export default PrivacyPage
