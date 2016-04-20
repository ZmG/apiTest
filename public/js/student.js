/**
 * Created by Zhaky on 02/03/2014.
 */

var Student = {

    initialize: function() {

        //$('profile').addClassName('selected');

        /*var elementsArray = new Array('staff', 'staff_side', 'profile', 'profile_side', 'personal_tutor_td',
                                      'personal_tutor_td_side');

        for (var value in elementsArray) {
            if (typeof(elementsArray[value]) == 'string') {
                $(elementsArray[value]).observe('click', function(){console.log(elementsArray[value]);

                    if ((elementsArray[value] == 'profile') || (elementsArray[value] == 'profile_side')) {
                        console.log('profile');
                        showContent('my_profile');
                    }

                   /* switch (elementsArray[value]) {
                        case "staff":console.log('click');
                        case "staff_side":
                            showContent('list_staff');
                            break;
                        case "profile":
                        case "profile_side":console.log('profile');
                            showContent('my_profile');
                            break;
                        case "personal_tutor_td":
                        case "personal_tutor_td_side":
                            showContent('my_tutor');
                            break;
                    }*/

               /* });
            }
        }*/


        $('staff').observe('click', function() {
            showContent('list_staff');
        });

        $('profile').observe('click', function() {
            showContent('my_profile');

        });

        $('personal_tutor_td').observe('click', function() {
            showContent('my_tutor');
        });

        $('staff_side').observe('click', function () {
            showContent('list_staff');

        });

         $('profile_side').observe('click', function() {
             showContent('my_profile');

        });

        $('personal_tutor_td_side').observe('click', function() {
            showContent('my_tutor');

        });


        $('personal_tutor').observe('click', function() {
            showContent('my_tutor');

        });

        $('blog').observe('click', function() {
            showContent('blog_div');

        });

        $('blog_side').observe('click', function() {
            showContent('blog_div');

        });

        $('dashboard').observe('click', function() {
            showContent('reports_div');

        });

        $('dashboard_side').observe('click', function() {
            showContent('reports_div');

        });

        $('uploads_side').observe('click', function() {
            showContent('uploads_div');
            $('file').value = "";
           // ajaxForAllUploads();

        });

        $('uploads').observe('click', function() {
            showContent('uploads_div');
            $('file').value = "";
            //ajaxForAllUploads();

        });

        $('messages').observe('click', function() {
            showContent('messages_div');
        });

        $('messages_side').observe('click', function() {
            showContent('messages_div');
        });

        $('meetings').observe('click', function() {
            showContent('meetings_div');
        });

        document.body.on('click', '#meetings_side', function() {
            showContent('meetings_div');
        });

        $('new_message_link').observe('click', function() {
            $('sent_result').innerHTML = '';
            showContent('new_message');
        });

        $('new_blog_link').observe('click', function() {
            showContent('new_blog');
        });

        $('new_meeting_request_link').observe('click', function() {
            $('request_result').innerHTML = "";
            showContent('new_meeting_request');
        });

        $('back_to_messages').observe('click', function() {
            showContent('messages_div');
            ajaxForAllMessages();
        });

        $('back_to_staff').observe('click', function() {
            showContent('list_staff');
        });

        $('back_to_meetings').observe('click', function() {
            showContent('meetings_div');
            ajaxForAllMeetingRequests();

        });

        $('back_to_blogs').observe('click', function() {
            showContent('blog_div');
            ajaxForAllBlogs();

        });

        $('back_to_blogs_from_details').observe('click', function() {
            showContent('blog_div');
            ajaxForAllBlogs();

        });


        $('clear').observe('click', function() {
            $('message_area').value = "";

        });

        $('clear_blog_comment').observe('click', function() {
            $('blog_comment_area').value = "";

        });

        $('clear_request').observe('click', function() {
            $('meeting_message_area').value = "";

        });

        $('clear_blog').observe('click', function() {
            $('blog_detail_area').value = "";

        });

        $('message_area').observe('focus', function() {
            $('message_area').value = "";

        });

        $('blog_detail_area').observe('focus', function() {
            $('blog_detail_area').value = "";

        });

        $('blog_comment_area').observe('focus', function() {
            $('blog_comment_area').value = "";

        });

        $('meeting_message_area').observe('focus', function() {
            $('meeting_message_area').value = "";

        });

       /* $("table_nav").observe('mouseover', function() {
            this.style.cursor='pointer';
        });*/

        $("new_message_link").observe('mouseover', function() {
            this.style.cursor='pointer';
        });

        $("new_meeting_request_link").observe('mouseover', function() {
            this.style.cursor='pointer';
        });

        $("new_blog_link").observe('mouseover', function() {
            this.style.cursor='pointer';
        });


        $$('#main_nav li').each(function(tab) {
            tab.observe('click', function() {
                $$('#main_nav li').each(function(item) {
                    item.removeClassName('active');
                });
                tab.addClassName('active');
            });
        });



        document.body.on("click", '#all_blogs', function() {
            $$('#all_blogs div').each(function(blog) {
                blog.observe('click', function() {

                    ajaxForAllBlogDetails(blog.id);
                    showContent('blog_details');
                    $('save_comment_result').innerHTML = "";
                });
            })

        });


        document.body.on("click", '#staff_table', function() {
            $$('#staff_table tr').each(function(staff) {
                staff.observe('click', function() {

                    ajaxForStaffDetails(staff.id)
                });
            })

        });

        document.body.on("mouseover", '#all_blogs div', function() {
            $$('#all_blogs div').each(function(blog) {
                blog.style.cursor ='pointer';
                blog.style.border = "3px solid #7B698D";
            });

        });

        document.body.on("mouseover", '#all_blogs div', function() {
            $$('#all_blogs div').each(function(blog) {
                blog.style.border = "none";
            });

        });



        $('filter_search').observe('change', function() {
            var filter_search = $('filter_search').value;
            var search_term = $('search_student').value;
            ajaxForSearchStaff(search_term, filter_search)
        });

        $('search_student').observe('keyup', function() {
            var filter_search = $('filter_search').value;
            var search_term = $('search_student').value;
            ajaxForSearchStaff(search_term, filter_search)
        })

        document.body.on("click", "#send_message", function(event, cell) {

            var subject = $('subject').value;
            var message = $('message_area').value;
            var tutorId = $('tutor_id').value;

            if ((subject != "") && (message != "") && (tutorId != "") && (message != 'Type your message here ...')) {

                ajaxForSendMessage(subject, message, tutorId);
            } else {
                alert("Please fill in all the fields!");
            }

        });

        document.body.on("click", "#save_comment", function(event, cell) {

            var blogComment = $('blog_comment_area').value;
            var blogId = $('blogId').value;

            if ((blogComment != '') && (blogId != '') && (blogComment != "Type your comment here ...")) {

                ajaxForSaveBlogComment(blogComment, blogId);
            } else {
                alert("Please write your comment in the text area!");
            }


        });

        document.body.on("click", "#save_blog", function(event, cell) {

            var title = $('title').value;
            var blog = $('blog_detail_area').value;

            if ((title != '') && (blog != '') && (blog != "Start your blog here ...")) {
                ajaxForSaveBlog(title, blog);
            } else {
                alert("Please fill in all the fields!");
            }



        });

        document.body.on("click", "#request", function(event, cell) {

            var agenda = $('agenda').value;
            var meeting_message = $('meeting_message_area').value;
            var tutorId = $('tutor_id').value;
            var meeting_type = $('meeting_type').value;

            if ((meeting_type != 0) && (meeting_message != '') && (meeting_message != 'Type your message here ...')
                && (tutorId != '') && (agenda != '')) {

                ajaxForRequestMeeting(agenda, meeting_type, meeting_message, tutorId);
            } else {
                alert("Please fill in all the fields!");
            }

        });

    }


}

function showContent(showItem) {

    $('list_staff').hide();
    $('my_profile').hide();
    $('my_tutor').hide();
    $('meetings_div').hide();
    $('new_message').hide();
    $('messages_div').hide();
    $('new_meeting_request').hide();
    $('blog_div').hide();
    $('new_blog').hide();
    $('blog_details').hide();
    $('uploads_div').hide();
    $('reports_div').hide();
    $('staff_details_div').hide();
    if (showItem) {
        $(showItem).show();
    }
    if ($('etutor_canvas').hasClassName('move-right') == true) {
        $('etutor_canvas').removeClassName('move-right');
    }
}


function ajaxForSendMessage(subject, message, tutorId) {

    new Ajax.Request('send-message-json', {
        parameters: {
            subject: subject,
            message: message,
            tutorId: tutorId

        }, onSuccess: function(response) {

            var response = response.responseText.evalJSON();

            $('sent_result').innerHTML = response;
            $('message_area').value = "";
            $('subject').value = "";

        }
    });

}

function ajaxForSaveBlog(title, blog_detail) {

    new Ajax.Request('save-blog-json', {
        parameters: {
            title: title,
            blog_detail: blog_detail

        }, onSuccess: function(response) {

            var response = response.responseText.evalJSON();

            $('save_result').innerHTML = response;
            $('blog_detail_area').value = "";

        }
    });

}


function ajaxForSaveBlogComment(blog_comment, blog_id) {

    new Ajax.Request('save-blog-comment-json', {
        parameters: {
            blog_comment: blog_comment,
            blog_id: blog_id

        }, onSuccess: function(response) {

            var response = response.responseText.evalJSON();

            $('save_comment_result').innerHTML = response;
            $('blog_comment_area').value = "";

            ajaxForAllBlogDetails(blog_id);

        }
    });

}

function ajaxForRequestMeeting(agenda, meeting_type, meeting_message, tutorId) {

    new Ajax.Request('request-meeting-json', {
        parameters: {
            agenda: agenda,
            meeting_type: meeting_type,
            meeting_message: meeting_message,
            tutorId: tutorId

        }, onSuccess: function(response) {

            var response = response.responseText.evalJSON();

            $('request_result').innerHTML = response;
            $('meeting_message_area').value = "";
            $('agenda').value = "";
            $('meeting_type').value = 0;

        }
    });

}

function ajaxForAllMessages() {

    new Ajax.Request('show-all-messages-json', {

        onSuccess: function(response) {

            var allMessages = response.responseText.evalJSON();

            $('all_messages').remove();

            $('all_messages_div').insert('<div id="all_messages"></div>');

            for (var i = 0;i < allMessages.length; i++) {
                if ((allMessages[i]['student_sender'] != null) && (allMessages[i]['student_receiver'] == null)) {
                    $('all_messages').insert('<div class="message_sent">' +
                        '<ul>' +
                        '<li><label>From: </label>Me</li>' +
                        '<li><label>Subject: </label>' + allMessages[i]['subject'] + '</li>' +
                        '<li><label>Message Text: </label>' + allMessages[i]['message_body'] + '</li>' +
                        '</ul>' +
                        '<p style="text-align: right">Sent on:' + allMessages[i]['date'] + '</p> </div>');
                } else if ((allMessages[i]['student_sender'] == null) && (allMessages[i]['student_receiver'] != null)) {
                    $('all_messages').insert('<div class="message_received">' +
                        '<ul>' +
                        '<li><label>From: </label>Me</li>' +
                        '<li><label>Subject: </label>' + allMessages[i]['subject'] + '</li>' +
                        '<li><label>Message Text: </label>' + allMessages[i]['message_body'] + '</li>' +
                        '</ul>' +
                        '<p style="text-align: right">Sent on:' + allMessages[i]['date'] + '</p> </div>');
                }
            }



        }
    });
}


function moveSideBar(observedItem) {

    observedItem.observe('click', function() {
        if ($('etutor_canvas').hasClassName('move-right') == true) {
            $('etutor_canvas').removeClassName('move-right');
        }
    });

}

function ajaxForAllMeetingRequests() {

    new Ajax.Request('show-all-meetings-requests-json', {

        onSuccess: function(response) {

            var allMeetingRequests = response.responseText.evalJSON();

            $('all_meeting_requests').remove();

            $('all_meetings_div').insert('<div id="all_meeting_requests"></div>');

            for (var i = 0;i < allMeetingRequests.length; i++) {

                $('all_meeting_requests').insert('<div class="message_sent">' +
                    '<ul>' +
                    '<li><label>From: </label>Me</li>' +
                    '<li><label>Meeting Type: </label>' + allMeetingRequests[i]['meeting_type'] + '</li>' +
                    '<li><label>Agenda: </label>' + allMeetingRequests[i]['meeting_agenda'] + '</li>' +
                    '<li><label>Message Text: </label>' + allMeetingRequests[i]['message'] + '</li>' +
                    '</ul>' +
                    '<p style="text-align: right">Sent on:' + allMeetingRequests[i]['date_requested'] + '</p> </div>');
            }

        }
    });
}

function ajaxForAllBlogs() {

    new Ajax.Request('show-all-blogs-json', {

        onSuccess: function(response) {

            var allBlogs = response.responseText.evalJSON();

            $('all_blogs').remove();

            $('all_blogs_div').insert('<div id="all_blogs"></div>');

            for (var i = 0;i < allBlogs.length; i++) {

                $('all_blogs').insert('<div onclick="" style="background-color: #CFEEFA!important;" id="' + allBlogs[i]['blog_id'] + '" class="message_sent">' +
                    '<ul>' +
                    '<li><label>Title: </label>' + allBlogs[i]['blog_title'] + '</li>' +
                    '<li><label>Blog Body: </label>' + allBlogs[i]['blog_detail'] + '</li>' +
                    '<li><input type="hidden" id="blogId" name="blogId" value="' + allBlogs[i]['blog_id'] + '"/></li>' +
                    '</ul>' +
                    '<p style="text-align: right">Started on: ' + allBlogs[i]['blog_date_time'] + '</p> </div>');
            }

        }
    });
}



function ajaxForAllUploads() {

    new Ajax.Request('show-all-uploaded-files-json', {

        onSuccess: function(response) {

            var allUploads = response.responseText.evalJSON();

            $('all_uploads').remove();

            $('all_uploads_div').insert('<div id="all_uploads"></div>');

            for (var i = 0;i < allUploads.length; i++) {

                $('all_uploads').insert('<div style="background-color: #FEF2CC!important;" id="' + allUploads[i]['file_id'] + '" class="message_sent">' +
                    '<ul>' +
                    '<li><label>File Name: </label><a href="../uploads/' + allUploads[i]["file_name"] + '"' + 'target="_blank">' + allUploads[i]["file_name"] + '</a></li>' +
                    '</ul>' +
                    '<p style="text-align: right">Uploaded on: ' + allUploads[i]['upload_timestamp'] + '</p> </div>');
            }

        }
    });
}


function ajaxForStaffDetails(staffId) {

    new Ajax.Request('show-staff-details-json', {
        parameters: {
            staffId: staffId
        },

        onSuccess: function(response) {

            showContent('staff_details_div');


            var staffDetails = response.responseText.evalJSON();

            $('staff_title').innerHTML = staffDetails['staff_title'];
            $('staff_firstname').innerHTML = staffDetails['staff_firstname'];
            $('staff_lastname').innerHTML = staffDetails['staff_lastname'];
            $('job_title').innerHTML = staffDetails['job_title'];
            $('email').innerHTML =  '<a href="mailto:' + staffDetails['email'] +'">'+ staffDetails['email'] + '</a>';
            $('room').innerHTML = staffDetails['room'];
            $('working_hours').innerHTML = staffDetails['working_hours'];
            $('office_number').innerHTML = staffDetails['office_number'];
            $('staff_photo').setAttribute('src','../img/etutorimages/'+ staffDetails['photo']);

        }
    });
}




function ajaxForAllBlogDetails(blog_id) {

    new Ajax.Request('show-blog-details-json', {
        parameters: {
            blog_id: blog_id
        },

        onSuccess: function(response) {

            var json = response.responseText.evalJSON();
            var blogDetails = json['blogDetails'];
            var blogComments = json['blogComments'];


            $('blog_details_div').remove();
            $('blog_comments_div').remove();

            $('blog_details_comments_div').insert('<div id="blog_details_div"></div>');


                $('blog_details_div').insert('<h1 style="font-size: 36px">' + blogDetails['blog_title'] + '</h1>' +
                    '<ul>' +
                    '<li><label>Blog Body: </label>' + blogDetails['blog_detail'] + '</li>' +
                    '<li><input type="hidden" id="blogId" name="blogId" value="' + blogDetails['blog_id'] + '"/></li>' +
                    '</ul>' +
                    '<p style="text-align: right">Started on: ' + blogDetails['blog_date_time'] + '</p> </div>');

            $('blog_details_comments_div').insert('<div id="blog_comments_div"><h1 style="font-size: 26px; margin: 0">Comments</h1></div>');
            for (var i = 0;i < blogComments.length; i++) {

                $('blog_comments_div').insert('<div class="message_sent">' +
                    '<ul>' +
                    '<li><label>From: </label>Me</li>' +
                    '<li><label>Comment Text: </label>' + blogComments[i]['comment_body'] + '</li>' +
                    '</ul>' +
                    '<p style="text-align: right">Commented on:' + blogComments[i]['comment_timestamp'] + '</p> </div>');
            }


        }


    });
}


function ajaxForSearchStaff(search_term, filter_search) {

    new Ajax.Request('search-staff-json', {
        parameters: {
            search_term: search_term,
            filter_search: filter_search
        },
        onSuccess:function(response){

            var staff = response.responseText.evalJSON();

            $$('#staff_table td').each(function(item) {
                var row = $(item).up('tr');

                var table = $('staff_table');

                table.deleteRow($(row).rowIndex);

            })

            var heading_row = '<tr><th>Title</th><th>First Name</th><th>Last Name</th><th>Job Title</th></tr>';
            var table = $('staff_table');


            for (var n = 0; n < staff.length; n++) {


                var insert_row_string = '<tr>';

                for (var value in staff[n]) {

                    if (value != 'staff_id') {

                        insert_row_string += '<td>' + staff[n][value] + '</td>';
                    }

                }

                insert_row_string +='</tr>';
                $(table.insertRow(n)).update(insert_row_string);

            }

            if (staff.length > 0) {

                $(table.insertRow(0)).update(heading_row);
                $('students_error').hide();
            } else {
                $('students_error').show();
            }

        }});
}
