import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import {FooterCreds} from "../../components/credsFooter/FooterCreds";
import Header from "../../components/header/Header";
import {Flex} from "../../components/customDiv/Flex";

const CastingDetail = () => {
    const { casting_id } = useParams();
    const [casting, setCasting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [getImage, setImage] = useState(null);

    useEffect(() => {
        if (!casting_id) {
            setError('Film not found');
            setLoading(false);
            return;
        }

        let isMounted = true;

        const fetchCastingDetail = async () => {
            try {
                const [detailsResponse, imageResponse] = await axios.all([
                  axios.get(`http://57.151.104.191:8888/api/pages/casting/${casting_id}`),
                  axios.get(`http://57.151.104.191:8888/api/pages/casting/${casting_id}/image`, {
                      responseType: 'blob'
                  })
                ])
                if (isMounted) {
                    setCasting(detailsResponse.data);
                    const imageBlob = imageResponse.data;
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImage(imageUrl);
                }
            } catch (error) {
                if (isMounted) {
                    setError('Failed to fetch film details or poster');
                }            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCastingDetail();
        return () => {
            isMounted = false;
        };
    }, [casting_id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!casting) {
        return <p>No details available.</p>;
    }

    return (
        <Flex className="casting-detail" flexDirection="column">
            <Header />
            <Flex className="bg-cast-det" style={{backgroundImage: `url(${getImage})`, backgroundSize: 'cover'}}/>
            <h1>{casting.title}</h1>
            <img src={casting.imageUrl} alt={casting.title} />
            <p>{casting.additional_info}</p>
            <p>Roles: {casting.roles.length}</p>
            <p>askndnaslnlansdnkakondkonnk</p>
        </Flex>
    );
};

export default CastingDetail;
