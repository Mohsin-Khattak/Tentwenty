import React, { useCallback, useRef } from 'react';
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
  const playerRef = useRef<any>(null);

  // Dynamic top bar style calculate kar rahe hain taake inline code messy na lage
  const dynamicTopBarStyles = {
    top: insets.top > 0 ? insets.top + 10 : 20,
  };

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
      onShow={() => setPlaying(true)}
    >
      <View style={styles.container}>
        <View style={[styles.topBar, dynamicTopBarStyles]}>
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        {trailerKey && (
          <View style={styles.playerWrapper}>
            <YoutubePlayer
              ref={playerRef}
              height={230}
              width={width}
              play={playing}
              videoId={trailerKey}
              onChangeState={onStateChange}
              onReady={() => {
                setTimeout(() => {
                  playerRef.current?.playVideo?.();
                }, 200);
              }}
              initialPlayerParams={{
                autoplay: 1,
                mute: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    right: 20,
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
