import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';

const TermsAndConditionsPopup = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <ScrollView style={styles.popup}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.content}>
            {/* Add your terms and conditions text here */}
            <Text style={styles.numberedListItem}>Welcome to WarePort Portal</Text>
            {"\n"}
            Below are
            the terms and conditions that govern your
            use of WarePort platform:
            {"\n"}<Text style={{fontWeight:'bold'}}>1. Acceptance of Terms:</Text> By using WarePort portal, you agree to be bound by
            these terms and conditions. If you do not
            accept these terms and conditions, please
            do not use our platform.
            {"\n"}<Text style={{fontWeight:'bold'}}>2. License and Ovwnership:</Text> WarePort is licensed, not sold, to you. We retain
            ownership of all intellectual property rights
            in the Software platform. You may use the WarePort platform
            only for business purposes as
            permitted by our license agreement.
            {"\n"}<Text style={{fontWeight:'bold'}}>3. Restrictions on Use:</Text> You may not sell,
            resell, transfer, sublicense, or distribute our
            WarePort portal to any third party. You may
            not modify, reverse engineer, decompile, or
            disassemble the platform or attempt to do
            so.
            {"\n"}<Text style={{fontWeight:'bold'}}>4. User Content:</Text> You are solely responsible
            for any content that you upload, publish,
            display, or transmit through WarePort Vendor application or
            portal. You retain ownership of all
            intellectual property rights in your content,
            but grant us a non-exclusive, worldwide,
            royalty-free, sublicensable, and transferable
            license to use, reproduce, distribute,
            prepare derivative works of, and display
            your content in connection with our
            platform.
            {"\n"}<Text style={{fontWeight:'bold'}}>5. Privacy Policy:</Text> Our privacy policy
            describes how we collect, use, and protect
            your personal data. By using our WarePort 
            portal, you agree to be bound by our privacy
            policy.
            {"\n"}<Text style={{fontWeight:'bold'}}>6. Disclaimer of Warranties:</Text> Our WarePort 
            portal is provided "as is" without warranty of
            any kind. We make no warranties, express or
            implied, regarding the platform's reliability, Buyer's reliability or suitability for any
            purpose.
            {"\n"}<Text style={{fontWeight:'bold'}}>7. Limitation of Liability:</Text> In no event shall
            we be liable for any damages arising out
            of or in connection with your use of WarePort portal, whether direct, indirect,
            incidental, consequential, special, punitive,
            or otherwise.
            {"\n"}<Text style={{fontWeight:'bold'}}>8. Indemnification:</Text> You agree to indemnify
            and hold us harmless from any claim or
            demand, including reasonable attorneys'
            fees, made by any third party due to or
            arising out of your use of  WarePort 
            portal, your violation of these terms and
            conditions, or your infringement of any
            intellectual property or other right of any
            person or entity.
            {"\n"}<Text style={{fontWeight:'bold'}}>9. Termination:</Text> We may terminate your use
            of WarePort Portal at any time if you
            violate these terms and conditions. 
            Upon termination, you must immediately cease all use of the WarePort platform and destroy all copies of
            our data in your possession.
          </Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight:24,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  numberedListItem: {
    fontWeight: 'bold',
    marginTop: 8,
    color:'blue'
  },
});

export default TermsAndConditionsPopup;
