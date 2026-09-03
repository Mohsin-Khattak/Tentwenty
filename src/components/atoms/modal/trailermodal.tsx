import React, { useCallback } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

interface TrailerModalProps {
  visible: boolean;
  trailerKey: string | null;
  playing: boolean;
  onClose: () => void;
  setPlaying: (playing: boolean) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  visible,
  trailerKey,
  playing,
  onClose,
  setPlaying,
}) => {
  const insets = useSafeAreaInsets();

  const onStateChange = useCallback(
    (state: string) => {
      if (state === 'ended') {
        setPlaying(false);
        onClose();
      }
    },
    [onClose, setPlaying],
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.topBar,
            { paddingTop: insets.top > 0 ? insets.top + 10 : 20 },
          ]}
        >
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        {trailerKey && (
          <View style={styles.playerWrapper}>
            <YoutubePlayer
              height={230}
              width={width}
              play={playing}
              videoId={trailerKey}
              forceAndroidAutoplay={true}
              onChangeState={onStateChange}
              initialPlayerParams={{
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                controls: 0,
              }}
              webViewProps={{
                allowsInlineMediaPlayback: true,
                mediaPlaybackRequiresUserAction: false,
              }}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBar: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  doneText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  playerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
