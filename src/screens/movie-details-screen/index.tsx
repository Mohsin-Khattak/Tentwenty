import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackIcon, PlayIcon } from '../../assets/icons';
import { PrimaryButton } from '../../components/atoms/button/primary-button';

import { TrailerModal } from '../../components/atoms/modal/trailermodal';
import { navigate } from '../../navigation/navigation-ref';
import {
  getMovieDetails,
  getMovieVideos,
} from '../../services/api/watch-api-action';
import { MovieDetails } from '../../types/entities-types';
import Bold from '../../typography/bold-text';
import Medium from '../../typography/medium-text';
import Regular from '../../typography/regular-text';
import styles from './styles';

const GENRE_COLORS = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F', '#60C3D8'];

const MoviesDetailsScreen = (props: any) => {
  const movieId = props.route?.params?.movieId;
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Player States
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const insets = useSafeAreaInsets();

  const getDetails = useCallback(async () => {
    try {
      const response = await getMovieDetails(movieId);
      setData(response);
    } catch (error) {
      console.log('TMDB ERROR:', error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  const getVideoTrailer = async () => {
    try {
      setTrailerLoading(true);
      const response = await getMovieVideos(movieId);
      const results = response?.results || [];

      const officialTrailer = results.find(
        (item: any) => item.site === 'YouTube' && item.type === 'Trailer',
      );
      const selectedVideo =
        officialTrailer || results.find((item: any) => item.site === 'YouTube');

      if (selectedVideo?.key) {
        setTrailerKey(selectedVideo.key);
        setIsVideoVisible(true);
        setPlaying(true);
      } else {
        console.log('No video trailer key found');
      }
    } catch (error) {
      console.log('TMDB TRAILER ERROR:', error);
    } finally {
      setTrailerLoading(false);
    }
  };

  const closePlayer = () => {
    setPlaying(false);
    setIsVideoVisible(false);
  };

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#61C3F2" />
      </View>
    );
  }

  const backdropUrl = data?.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : '';

  const formattedDate = data?.release_date
    ? new Date(data.release_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const dynamicOverlayStyle = {
    paddingTop: insets.top > 0 ? insets.top + 10 : 20,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerImage}>
          <FastImage
            source={{
              uri: backdropUrl,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={[styles.headerImage as any]}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={[styles.overlay, dynamicOverlayStyle]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => props.navigation?.goBack()}
            >
              <BackIcon />
              <Regular style={styles.backText} label={'Watch'} />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Medium style={styles.title} fontSize={16} label={data?.title} />
              {formattedDate ? (
                <Medium fontSize={16} style={styles.releaseDate}>
                  In Theaters {formattedDate}
                </Medium>
              ) : null}

              <PrimaryButton
                title="Get Tickets"
                onPress={() => navigate('SeatLayoutScreen')}
              />
              <PrimaryButton
                title={trailerLoading ? 'Loading...' : 'Watch Trailer'}
                variant="outlined"
                icon={!trailerLoading ? <PlayIcon /> : null}
                onPress={getVideoTrailer}
              />
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Medium style={styles.sectionTitle} label={'Genres'} />

          <View style={styles.genresRow}>
            {data?.genres?.map((genre, index) => (
              <View
                key={genre.id}
                style={[
                  styles.genreBadge,
                  {
                    backgroundColor: GENRE_COLORS[index % GENRE_COLORS.length],
                  },
                ]}
              >
                <Bold
                  fontSize={13}
                  style={styles.genreText}
                  label={genre.name}
                />
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Medium style={styles.sectionTitle} label={'Overview'} />
          <Regular
            numberOfLines={100}
            style={styles.overviewText}
            label={data?.overview}
          />
        </View>
      </ScrollView>

      {/* Reusable Trailer Modal Component */}
      <TrailerModal
        visible={isVideoVisible}
        trailerKey={trailerKey}
        playing={playing}
        onClose={closePlayer}
        setPlaying={setPlaying}
      />
    </View>
  );
};

export default MoviesDetailsScreen;
