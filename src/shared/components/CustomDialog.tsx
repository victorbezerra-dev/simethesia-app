import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Path } from 'react-native-svg';

type CustomDialogProps = {
  visible: boolean
  onClose: () => void
  icon?: React.ReactNode
  title?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  visible,
  onClose,
  icon,
  title,
  children,
  actions,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
  >
    <View style={styles.overlay}>
      <View style={styles.dialogWrapper}>
        <View style={styles.dialogContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color='#ffff' />
          </TouchableOpacity>

          {icon && (
            <View style={styles.iconContainer}>
              {icon}
            </View>
          )}

          <View style={styles.wave}>
            <Svg viewBox="0 0 335 200" width="100%" height="200">
              <Path
                d="M0 20C0 8.95431 8.95431 0 20 0H315C326.046 0 335 8.95431 335 20V71H0V20Z"
                fill="#093361"
              />
              <Path
                d="M0 164H19.0682C38.1365 164 76.273 164 114.409 151.143C152.546 138.286 190.682 112.571 228.819 116.871C266.955 121.009 220.344 147.004 258.481 151.143C296.617 155.442 315.935 129.728 335.003 116.871V55.5H276.677L291.632 44C272.564 44 296.617 60.5 258.481 60.5C220.344 60.5 266.955 74 228.819 74C190.682 74 152.546 74 114.409 74C76.273 74 38.1365 74 19.0682 74H0V164Z"
                fill="#093361"
                fillOpacity="0.67"
              />
              <Path
                d="M0 153H13.9583C27.9167 153 55.8333 153 83.75 140.143C111.667 127.286 139.583 101.571 167.5 105.871C195.417 110.009 223.333 144.562 251.25 148.701C279.167 153 307.083 127.286 321.042 114.429L335 101.571V63H321.042C307.083 63 279.167 63 251.25 63C223.333 63 195.417 63 167.5 63C139.583 63 111.667 63 83.75 63C55.8333 63 27.9167 63 13.9583 63H0V153Z"
                fill="#093361"
              />
            </Svg>
          </View>


          <View style={styles.content}>
            {title && <Text style={styles.title}>{title}</Text>}
            {children ? children : <View style={styles.emptySpace} />}

            <View style={styles.actions}>
              {actions ?? (
                <TouchableOpacity onPress={onClose} style={styles.defaultButton}>
                  <Text style={styles.defaultButtonText}>Fechar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>


        </View>
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(2, 16, 31, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySpace: {
    flex: 1,
    width: '100%',
  },
  dialogWrapper: {
    width: '90%',
  },
  dialogContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'visible',
    minHeight: 350,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 20,
    padding: 5,
  },

  wave: {
    position: 'absolute',
    top: -15,
    left: 0,
    width: '100%',
    height: 160,
    zIndex: 1
  },

  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -25,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  content: {
    marginTop: 60,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    zIndex: 5
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 38,
    zIndex: 5
  },

  actions: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  defaultButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#093361',
    borderRadius: 8,
  },
  defaultButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default CustomDialog