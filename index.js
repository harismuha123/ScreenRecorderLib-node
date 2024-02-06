import edge from 'edge-js';

var createRecording = edge.func(function() {/*

    #r "ScreenRecorderLib.dll"

    using ScreenRecorderLib;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    public class Startup
    {
        Recorder _rec;
        void CreateRecording()
        {

            //This is how you can select audio devices. If you want the system default device,
            //just leave the AudioInputDevice or AudioOutputDevice properties unset or pass null or empty string.
            var audioInputDevices = Recorder.GetSystemAudioDevices(AudioDeviceSource.InputDevices);
            var audioOutputDevices = Recorder.GetSystemAudioDevices(AudioDeviceSource.OutputDevices);
            string selectedAudioInputDevice = audioInputDevices.Count > 0 ? audioInputDevices.First().DeviceName : null;
            string selectedAudioOutputDevice = audioOutputDevices.Count > 0 ? audioOutputDevices.First().DeviceName : null;

            var opts = new RecorderOptions
            {
                AudioOptions = new AudioOptions
                {
                    AudioInputDevice = selectedAudioInputDevice,
                    AudioOutputDevice = selectedAudioOutputDevice,
                    IsAudioEnabled = true,
                    IsInputDeviceEnabled = true,
                    IsOutputDeviceEnabled = true,
                },
                VideoEncoderOptions = new VideoEncoderOptions
                {
                    Bitrate = 8000 * 1000,
                    Framerate = 60,
                    IsFixedFramerate = true,
                    //Currently supported are H264VideoEncoder and H265VideoEncoder
                    Encoder = new H264VideoEncoder
                    {
                        BitrateMode = H264BitrateControlMode.CBR,
                        EncoderProfile = H264Profile.Main,
                    },
                    //Fragmented Mp4 allows playback to start at arbitrary positions inside a video stream,
                    //instead of requiring to read the headers at the start of the stream.
                    IsFragmentedMp4Enabled = true,
                    //If throttling is disabled, out of memory exceptions may eventually crash the program,
                    //depending on encoder settings and system specifications.
                    IsThrottlingDisabled = false,
                    //Hardware encoding is enabled by default.
                    IsHardwareEncodingEnabled = true,
                    //Low latency mode provides faster encoding, but can reduce quality.
                    IsLowLatencyEnabled = false,
                    //Fast start writes the mp4 header at the beginning of the file, to facilitate streaming.
                    IsMp4FastStartEnabled = false
                }
            };

            _rec = Recorder.CreateRecorder(opts);
            _rec.OnRecordingComplete += Rec_OnRecordingComplete;
            _rec.OnRecordingFailed += Rec_OnRecordingFailed;
            _rec.OnStatusChanged += Rec_OnStatusChanged;
            //Record to a file
            string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss");
            string filePath = Path.Combine(Path.GetTempPath(), "ScreenRecorder", timestamp, timestamp + ".mp4");
            _rec.Record(filePath);
            System.Threading.Thread.Sleep(10000);
            EndRecording();

        }
        void EndRecording()
        {
            _rec.Stop(); 
        }
        private void Rec_OnRecordingComplete(object sender, RecordingCompleteEventArgs e)
        {
	        //Get the file path if recorded to a file
            string path = e.FilePath;	
        }
        private void Rec_OnRecordingFailed(object sender, RecordingFailedEventArgs e)
        {
            string error = e.Error;
        }
        private void Rec_OnStatusChanged(object sender, RecordingStatusEventArgs e)
        {
            RecorderStatus status = e.Status;
        }

        public async Task<object> Invoke(object input)
        {
            CreateRecording();
            return null;
        }
    }

*/});

var helloWorld = edge.func(function () {/*
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
*/});

createRecording(null, function (error, result) {
    if (error) throw error;
    console.log(result);
});

// helloWorld('JavaScript', function (error, result) {
//     if (error) throw error;
//     console.log(result);
// });